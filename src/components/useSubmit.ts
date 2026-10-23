'use client';
import { useRef, useState } from 'react';

export type Status = { state: 'idle' | 'sending' | 'ok' | 'error'; message?: string; fields?: Record<string, string[]> };

export function useSubmit(endpoint: string, build: (fd: FormData) => Record<string, unknown>) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const started = useRef(Date.now());
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus({ state: 'sending' });
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...build(fd), company_website: String(fd.get('company_website') ?? ''), startedAt: started.current }) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Record<string, string[]> };
      if (res.ok && data.ok) { setStatus({ state: 'ok' }); form.reset(); started.current = Date.now(); }
      else setStatus({ state: 'error', message: data.error ?? 'Something went wrong. Please try again.', fields: data.fields });
    } catch {
      setStatus({ state: 'error', message: 'Network problem. Please check your connection and try again.' });
    }
  }
  return { status, onSubmit };
}
