export interface ApplicationInput {
  full_name: string;
  email: string;
  phone: string;
  experience: string;
  cover_letter: string;
  position: string;
}
export interface ApplicationReceipt { id: string; status: 'received'; }

export async function submitApplication(data: ApplicationInput, resumeFile: File, submissionId: string, website = ''): Promise<ApplicationReceipt> {
  const form = new FormData();
  for (const [name, value] of Object.entries(data)) form.append(name, value);
  form.append('resume', resumeFile);
  form.append('submission_id', submissionId);
  form.append('website', website);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch('/api/applications', { method: 'POST', body: form, signal: controller.signal });
    const result = await response.json().catch(() => null);
    if (!response.ok) throw new Error(result?.message || 'Your application could not be submitted. Please try again.');
    if (typeof result?.id !== 'string' || result.status !== 'received') throw new Error('We could not confirm receipt. Please retry using the same form.');
    return result;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw new Error('Confirmation is taking longer than expected. Please retry; the same application will not be saved twice.');
    if (error instanceof TypeError) throw new Error('Please check your connection and try again. Your form has been kept.');
    throw error;
  } finally { clearTimeout(timeout); }
}
