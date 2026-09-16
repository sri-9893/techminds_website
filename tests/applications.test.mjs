import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { randomUUID } from 'node:crypto';

const url = process.env.APPLICATIONS_TEST_URL;
const storage = process.env.APPLICATIONS_TEST_STORAGE;
if (!url || !storage) throw new Error('Set APPLICATIONS_TEST_URL and APPLICATIONS_TEST_STORAGE for an isolated local test server.');
if (!['127.0.0.1', 'localhost'].includes(new URL(url).hostname)) throw new Error('Application tests may only run against localhost.');
const root = path.resolve(storage);
const temp = path.resolve(os.tmpdir());
if (!root.toLowerCase().startsWith((temp + path.sep).toLowerCase())) throw new Error('Tests require a separate storage folder inside the system temporary directory.');

const pdf = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF');
const defaults = { full_name: 'Application Test', email: 'application-test@example.com', phone: '+91 90000 00000', experience: 'Fresher', cover_letter: 'Local automated test only.', position: 'Frontend Developer', website: '' };
function form(id = randomUUID(), overrides = {}, file = { bytes: pdf, filename: 'resume.pdf' }) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...defaults, submission_id: id, ...overrides })) data.set(key, value);
  if (file) data.set('resume', new Blob([file.bytes]), file.filename);
  return data;
}
async function submit(data, headers) {
  const response = await fetch(url + '/api/applications', { method: 'POST', body: data, headers });
  return { status: response.status, body: await response.json() };
}
const reference = randomUUID();

test('saves the application and original resume before acknowledging receipt', async () => {
  const result = await submit(form(reference));
  assert.equal(result.status, 201);
  assert.deepEqual(result.body, { id: reference, status: 'received' });
  const record = JSON.parse(await fs.readFile(path.join(root, reference, 'application.json'), 'utf8'));
  assert.equal(record.full_name, defaults.full_name);
  assert.equal(record.position, defaults.position);
  assert.equal(record.email, defaults.email);
  assert.deepEqual(await fs.readFile(path.join(root, reference, 'resume.pdf')), pdf);
  assert.equal((await fetch(url + '/.data/applications/' + reference + '/resume.pdf')).status, 404);
});

test('an identical retry returns the same receipt without another saved application', async () => {
  const result = await submit(form(reference));
  assert.equal(result.status, 200);
  assert.equal(result.body.id, reference);
  assert.equal((await fs.readdir(root)).filter(name => name === reference).length, 1);
});

test('a reused reference with changed data is rejected', async () => {
  const result = await submit(form(reference, { full_name: 'Different Person' }));
  assert.equal(result.status, 409);
  const record = JSON.parse(await fs.readFile(path.join(root, reference, 'application.json'), 'utf8'));
  assert.equal(record.full_name, defaults.full_name);
});

test('simultaneous identical submissions produce one complete record', async () => {
  const id = randomUUID();
  const results = await Promise.all([submit(form(id)), submit(form(id))]);
  assert.deepEqual(results.map(result => result.status).sort(), [200, 201]);
  assert.deepEqual(await fs.readFile(path.join(root, id, 'resume.pdf')), pdf);
  assert.equal((await fs.readdir(root)).filter(name => name.startsWith('.pending-')).length, 0);
});

test('requires a resume', async () => {
  const result = await submit(form(randomUUID(), {}, null));
  assert.equal(result.status, 400);
});

test('rejects an executable renamed as a PDF', async () => {
  const result = await submit(form(randomUUID(), {}, { filename: 'resume.pdf', bytes: Buffer.from('MZ not a PDF') }));
  assert.equal(result.status, 400);
});

test('rejects empty and oversized resumes', async () => {
  const empty = await submit(form(randomUUID(), {}, { filename: 'resume.pdf', bytes: Buffer.alloc(0) }));
  assert.equal(empty.status, 400);
  const large = await submit(form(randomUUID(), {}, { filename: 'resume.pdf', bytes: Buffer.alloc(5 * 1024 * 1024 + 1) }));
  assert.equal(large.status, 413);
});

test('validates email and current job position on the server', async () => {
  assert.equal((await submit(form(randomUUID(), { email: 'not-an-email' }))).status, 400);
  assert.equal((await submit(form(randomUUID(), { position: 'Unknown Role' }))).status, 400);
});

test('rejects bot-filled and cross-origin submissions', async () => {
  assert.equal((await submit(form(randomUUID(), { website: 'spam.example' }))).status, 400);
  assert.equal((await submit(form(), { Origin: 'https://other.example' })).status, 403);
});

test('requires a valid submission reference and bounds oversized multipart requests', async () => {
  assert.equal((await submit(form('../escape'))).status, 400);
  const response = await fetch(url + '/api/applications', { method: 'POST', headers: { 'Content-Type': 'multipart/form-data; boundary=test' }, body: Buffer.alloc(5 * 1024 * 1024 + 100000) });
  assert.equal(response.status, 413);
});

test('saves an internship application using a fixed safe resume filename', async () => {
  const id = randomUUID();
  const result = await submit(form(id, { position: 'Python Development Intern' }, { bytes: pdf, filename: '../../resume.pdf' }));
  assert.equal(result.status, 201);
  const record = JSON.parse(await fs.readFile(path.join(root, id, 'application.json'), 'utf8'));
  assert.equal(record.resume.filename, 'resume.pdf');
  assert.equal(record.resume.original_name, 'resume.pdf');
  assert.deepEqual(await fs.readFile(path.join(root, id, 'resume.pdf')), pdf);
});


test('accepts the actual same-origin hostname used by the browser', async () => {
  const localUrl = new URL(url); localUrl.hostname = 'localhost';
  const response = await fetch(localUrl.origin + '/api/applications', { method: 'POST', body: form(), headers: { Origin: localUrl.origin } });
  assert.equal(response.status, 201);
});
