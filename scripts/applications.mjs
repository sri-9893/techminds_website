import fs from 'node:fs/promises';
import path from 'node:path';
import nextEnv from '@next/env';

nextEnv.loadEnvConfig(process.cwd());
const root = path.resolve(process.env.APPLICATIONS_STORAGE_DIR || '.data/applications');
const entries = await fs.readdir(root, { withFileTypes: true }).catch(error => {
  if (error.code === 'ENOENT') return [];
  throw error;
});
const applications = [];
for (const entry of entries) {
  if (!entry.isDirectory() || !/^[0-9a-f-]{36}$/i.test(entry.name)) continue;
  const folder = path.join(root, entry.name);
  const application = JSON.parse(await fs.readFile(path.join(folder, 'application.json'), 'utf8'));
  const delivery = JSON.parse(await fs.readFile(path.join(folder, 'delivery.json'), 'utf8').catch(() => '{"status":"unknown"}'));
  applications.push({ received: application.received_at, name: application.full_name, email: application.email, role: application.position, notification: delivery.status, reference: application.id, resume: path.join(folder, application.resume.filename) });
}
applications.sort((a, b) => b.received.localeCompare(a.received));
if (!applications.length) console.log('No saved applications yet.');
else if (process.argv.includes('--json')) console.log(JSON.stringify(applications, null, 2));
else console.table(applications);
