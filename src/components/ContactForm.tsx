'use client';
import { useSubmit } from './useSubmit';

const v = (fd: FormData, k: string) => String(fd.get(k) ?? '').trim();

export function ContactForm() {
  const { status, onSubmit } = useSubmit('/api/contact', (fd) => ({
    name: v(fd, 'name'), email: v(fd, 'email'), phone: v(fd, 'phone') || undefined, business: v(fd, 'business') || undefined,
    projectType: v(fd, 'projectType'), budget: v(fd, 'budget') || undefined, message: v(fd, 'message'), timeline: v(fd, 'timeline') || undefined,
  }));
  const err = (k: string) => status.fields?.[k]?.[0] && <p className="fe">Please check this field.</p>;
  return (
    <form className="card" onSubmit={onSubmit} aria-label="Contact form">
      <label htmlFor="name">Full name</label><input id="name" name="name" required autoComplete="name" />{err('name')}
      <label htmlFor="email">Email address</label><input id="email" name="email" type="email" required autoComplete="email" />{err('email')}
      <label htmlFor="phone">Phone (optional)</label><input id="phone" name="phone" type="tel" autoComplete="tel" />
      <label htmlFor="business">Business name (optional)</label><input id="business" name="business" />
      <label htmlFor="projectType">Project type</label>
      <select id="projectType" name="projectType" required defaultValue="Business website">
        <option>Business website</option><option>E-commerce or product website</option><option>Custom web application</option><option>Content management system</option><option>Improvement or maintenance</option><option>Something else</option>
      </select>
      <label htmlFor="budget">Estimated budget (optional)</label><input id="budget" name="budget" placeholder="e.g. ₦150,000 – ₦300,000" />
      <label htmlFor="timeline">Preferred timeline (optional)</label><input id="timeline" name="timeline" placeholder="e.g. within 2 weeks" />
      <label htmlFor="message">Project description</label><textarea id="message" name="message" required minLength={10} maxLength={2000} />{err('message')}
      <div className="hp" aria-hidden="true"><label>Leave empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="btn" style={{ marginTop: 18 }} disabled={status.state === 'sending'}>{status.state === 'sending' ? 'Sending…' : 'Send message'}</button>
      <div role="status" aria-live="polite">
        {status.state === 'ok' && <p className="ok">Thanks. Your message was sent and Marvellous will get back to you.</p>}
        {status.state === 'error' && <p className="fe" style={{ marginTop: 12 }}>{status.message}</p>}
      </div>
    </form>
  );
}
