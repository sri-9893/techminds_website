import 'server-only';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, realpath, rename, rmdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ApplicationData, ApplicationError } from './validation';

export interface ApplicationRecord {
  id: string;
  received_at: string;
  full_name: string;
  email: string;
  phone: string;
  experience: string;
  cover_letter: string;
  position: string;
  resume: { filename: string; original_name: string; size: number };
  fingerprint: string;
}

function normalizePath(value: string) { return process.platform === 'win32' ? value.toLowerCase() : value; }
export async function storageDirectory() {
  const root = path.resolve(process.env.APPLICATIONS_STORAGE_DIR || path.join(process.cwd(), '.data', 'applications'));
  const publicRoot = normalizePath(path.resolve(process.cwd(), 'public'));
  const isPublic = (candidate: string) => { const normalized = normalizePath(candidate); return normalized === publicRoot || normalized.startsWith(publicRoot + path.sep); };
  if (isPublic(root)) throw new Error('APPLICATIONS_STORAGE_DIR must not be inside public.');
  await mkdir(root, { recursive: true, mode: 0o700 });
  const actual = await realpath(root);
  if (isPublic(actual)) throw new Error('APPLICATIONS_STORAGE_DIR resolves to a public directory.');
  return actual;
}

export async function saveApplication(data: ApplicationData, bytes: Buffer, resume: { filename: string; extension: string }) {
  const root = await storageDirectory();
  const folder = path.join(root, data.submission_id);
  const fingerprint = createHash('sha256').update(JSON.stringify({
    full_name: data.full_name, email: data.email, phone: data.phone, experience: data.experience,
    cover_letter: data.cover_letter, position: data.position, filename: resume.filename,
  })).update(bytes).digest('hex');
  const existing = async () => {
    try {
      const record: ApplicationRecord = JSON.parse(await readFile(path.join(folder, 'application.json'), 'utf8'));
      if (record.fingerprint !== fingerprint) throw new ApplicationError('This submission was already received. Close and reopen the form to send a different application.', 409);
      return record;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw error;
    }
  };
  const previous = await existing();
  if (previous) return { record: previous, created: false, folder };

  const record: ApplicationRecord = {
    id: data.submission_id, received_at: new Date().toISOString(),
    full_name: data.full_name, email: data.email, phone: data.phone,
    experience: data.experience, cover_letter: data.cover_letter, position: data.position,
    resume: { filename: 'resume.' + resume.extension, original_name: resume.filename, size: bytes.length },
    fingerprint,
  };
  const staging = await mkdtemp(path.join(root, '.pending-'));
  if (path.dirname(staging) !== root) throw new Error('Invalid application staging directory.');
  try {
    await writeFile(path.join(staging, record.resume.filename), bytes, { flag: 'wx', mode: 0o600 });
    await writeFile(path.join(staging, 'application.json'), JSON.stringify(record, null, 2), { flag: 'wx', mode: 0o600 });
    try {
      await rename(staging, folder);
    } catch (error) {
      // A simultaneous retry may have committed the same application first.
      const duplicate = await existing();
      if (duplicate) return { record: duplicate, created: false, folder };
      throw error;
    }
    return { record, created: true, folder };
  } finally {
    // Only these known files in our own temporary directory can be removed.
    await unlink(path.join(staging, record.resume.filename)).catch(() => {});
    await unlink(path.join(staging, 'application.json')).catch(() => {});
    await rmdir(staging).catch(() => {});
  }
}

export async function saveDeliveryStatus(folder: string, status: { status: string; provider_id?: string }) {
  await writeFile(path.join(folder, 'delivery.json'), JSON.stringify({ ...status, updated_at: new Date().toISOString() }, null, 2), { mode: 0o600 });
}
