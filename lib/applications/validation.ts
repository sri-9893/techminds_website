import { z } from 'zod';
import { jobsData, internshipsData } from '../data/careersData';

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
export const MAX_APPLICATION_BYTES = MAX_RESUME_BYTES + 64 * 1024;
const positions = new Set([...jobsData.map(job => job.title), ...internshipsData.map(intern => intern.role)]);

export const applicationSchema = z.object({
  submission_id: z.string().uuid('Please reopen the form and try again.'),
  full_name: z.string().trim().min(2, 'Enter your full name.').max(120, 'Your name is too long.').regex(/^[^\r\n]+$/, 'Enter your name on one line.'),
  email: z.string().trim().email('Enter a valid email address.').max(254).transform(value => value.toLowerCase()),
  phone: z.string().trim().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number.'),
  experience: z.string().trim().min(1, 'Tell us your experience level.').max(200),
  cover_letter: z.string().trim().max(4000).default(''),
  position: z.string().refine(value => positions.has(value), 'Choose a current role from the careers page.'),
  website: z.string().max(0, 'Unable to accept this application.').default(''),
});
export type ApplicationData = z.infer<typeof applicationSchema>;

export class ApplicationError extends Error {
  constructor(message: string, public status = 400) { super(message); this.name = 'ApplicationError'; }
}

export function validateResume(filename: string, bytes: Buffer) {
  if (!bytes.length) throw new ApplicationError('Your resume is empty. Please choose a valid file.');
  if (bytes.length > MAX_RESUME_BYTES) throw new ApplicationError('Your resume must be 5 MB or smaller.', 413);
  const extension = /\.(pdf|docx?)$/i.exec(filename)?.[1]?.toLowerCase();
  let valid = false;
  if (extension === 'pdf') valid = bytes.subarray(0, 5).toString() === '%PDF-';
  if (extension === 'doc') valid = bytes.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
  if (extension === 'docx') valid = bytes.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04])) && bytes.includes(Buffer.from('[Content_Types].xml')) && bytes.includes(Buffer.from('word/document.xml'));
  if (!valid) throw new ApplicationError('Upload a valid PDF, DOC, or DOCX resume.');
  return { extension: extension!, filename: filename.split(/[\\/]/).pop()!.replace(/[^a-zA-Z0-9._ -]/g, '_').slice(-120) };
}
