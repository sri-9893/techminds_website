import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { applicationSchema, ApplicationError, MAX_APPLICATION_BYTES, validateResume } from '@/lib/applications/validation';
import { saveApplication, saveDeliveryStatus } from '@/lib/applications/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const attempts = new Map<string, { count: number; expires: number }>();
const WINDOW_MS = 15 * 60 * 1000;

function rateLimit(request: Request) {
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const address = process.env.APPLICATIONS_TRUST_PROXY === 'true'
    ? request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'direct'
    : 'direct';
  const key = createHash('sha256').update(address).digest('hex');
  const limit = attempts.get(key);
  if (limit && limit.count >= (address === 'direct' ? 40 : 20)) throw new ApplicationError('Too many attempts. Please try again in 15 minutes.', 429);
  if (!limit && attempts.size >= 10000) throw new ApplicationError('Please try again in a few minutes.', 429);
  attempts.set(key, { count: (limit?.count || 0) + 1, expires: limit?.expires || now + WINDOW_MS });
}

async function readForm(request: Request) {
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data')) throw new ApplicationError('Submit the application using the careers form.');
  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > MAX_APPLICATION_BYTES) throw new ApplicationError('Your resume must be 5 MB or smaller.', 413);
  const reader = request.body?.getReader();
  if (!reader) throw new ApplicationError('The application is empty.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_APPLICATION_BYTES) { await reader.cancel(); throw new ApplicationError('Your resume must be 5 MB or smaller.', 413); }
      chunks.push(part.value);
    }
  } finally { reader.releaseLock(); }
  try {
    return await new Response(new Uint8Array(Buffer.concat(chunks)), { headers: { 'content-type': request.headers.get('content-type')! } }).formData();
  } catch { throw new ApplicationError('The upload could not be read. Please choose your resume again.'); }
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin');
    if (origin) {
      let originUrl: URL;
      try { originUrl = new URL(origin); } catch { throw new ApplicationError('Please submit the form from this website.', 403); }
      const host = process.env.APPLICATIONS_TRUST_PROXY === 'true'
        ? request.headers.get('x-forwarded-host')?.split(',')[0].trim() || request.headers.get('host')
        : request.headers.get('host');
      if (!['http:', 'https:'].includes(originUrl.protocol) || (originUrl.origin !== new URL(request.url).origin && originUrl.host !== host)) {
        throw new ApplicationError('Please submit the form from this website.', 403);
      }
    }
    rateLimit(request);
    const form = await readForm(request);
    const parsed = applicationSchema.safeParse({
      submission_id: form.get('submission_id'),
      full_name: form.get('full_name'),
      email: form.get('email'),
      phone: form.get('phone'),
      experience: form.get('experience'),
      cover_letter: form.get('cover_letter') || '',
      position: form.get('position'),
      website: form.get('website') || '',
    });
    if (!parsed.success) throw new ApplicationError(parsed.error.issues[0].message);
    const resume = form.get('resume');
    if (!resume || typeof resume === 'string') throw new ApplicationError('Please upload your resume.');
    const bytes = Buffer.from(await resume.arrayBuffer());
    const file = validateResume(resume.name, bytes);
    const saved = await saveApplication(parsed.data, bytes, file);
    if (saved.created) {
      await saveDeliveryStatus(saved.folder, { status: 'not_configured' }).catch(() => console.error('Could not record notification status for:', saved.record.id));
    }
    return NextResponse.json({ id: saved.record.id, status: 'received' }, { status: saved.created ? 201 : 200, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof ApplicationError) return NextResponse.json({ message: error.message }, { status: error.status, headers: { 'Cache-Control': 'no-store', ...(error.status === 429 ? { 'Retry-After': '900' } : {}) } });
    console.error('Application submission failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ message: 'We could not receive your application. Please retry, or send your resume to us on WhatsApp at +91 88862 69665.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
