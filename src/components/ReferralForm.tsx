'use client';
import { useSubmit } from './useSubmit';

const v = (fd: FormData, k: string) => String(fd.get(k) ?? '').trim();

export function ReferralForm() {
  const { status, onSubmit } = useSubmit('/api/referral', (fd) => ({
    referrerName: v(fd, 'referrerName'), referrerContact: v(fd, 'referrerContact'), clientName: v(fd, 'clientName'),
    clientBusiness: v(fd, 'clientBusiness'), clientContact: v(fd, 'clientContact') || undefined, details: v(fd, 'details'), consent: fd.get('consent') === 'on',
  }));
  return (
    <form className="card" onSubmit={onSubmit} aria-label="Referral form">
      <label htmlFor="referrerName">Your name</label><input id="referrerName" name="referrerName" required />
      <label htmlFor="referrerContact">Your email or phone</label><input id="referrerContact" name="referrerContact" required />
      <label htmlFor="clientName">Prospective client’s name</label><input id="clientName" name="clientName" required />
      <label htmlFor="clientBusiness">Their business</label><input id="clientBusiness" name="clientBusiness" required />
      <label htmlFor="clientContact">Business contact details (if available)</label><input id="clientContact" name="clientContact" />
      <label htmlFor="details">About the opportunity</label><textarea id="details" name="details" required minLength={10} maxLength={1500} />
      <label className="cb"><input type="checkbox" name="consent" required /> I consent to the relevant contact and data-handling terms.</label>
      <div className="hp" aria-hidden="true"><label>Leave empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="btn" style={{ marginTop: 18 }} disabled={status.state === 'sending'}>{status.state === 'sending' ? 'Submitting…' : 'Submit referral'}</button>
      <div role="status" aria-live="polite">
        {status.state === 'ok' && <p className="ok">Thank you. Your referral was submitted.</p>}
        {status.state === 'error' && <p className="fe" style={{ marginTop: 12 }}>{status.message}</p>}
      </div>
    </form>
  );
}
