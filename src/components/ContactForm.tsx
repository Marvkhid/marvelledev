'use client';
import { useSubmit } from './useSubmit';

const v = (fd: FormData, k: string) => String(fd.get(k) ?? '').trim();

const ENQUIRY_TYPES = ['Project enquiry', 'Service enquiry', 'Support request', 'Collaboration', 'Something else'];

const SERVICES = [
  'Business website',
  'E-commerce build',
  'Full-stack web application',
  'Custom software / internal tool',
  'API or backend work',
  'Improvement or maintenance',
  'Not sure yet',
];

export function ContactForm() {
  const { status, onSubmit } = useSubmit('/api/contact', (fd) => ({
    name: v(fd, 'name'),
    email: v(fd, 'email'),
    phone: v(fd, 'phone') || undefined,
    company: v(fd, 'company') || undefined,
    enquiryType: v(fd, 'enquiryType') || 'Project enquiry',
    service: v(fd, 'service') || undefined,
    budget: v(fd, 'budget') || undefined,
    timeline: v(fd, 'timeline') || undefined,
    message: v(fd, 'message'),
  }));

  const err = (k: string) => status.fields?.[k]?.[0] && <p className="fe">Please check this field.</p>;
  const sending = status.state === 'sending';

  return (
    <form className="form" onSubmit={onSubmit} aria-label="Contact form">
      <div className="f2">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
          {err('email')}
        </div>
      </div>

      <div className="f2">
        <div className="field">
          <label htmlFor="phone">Phone <span className="hint">(optional)</span></label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+234…" />
        </div>
        <div className="field">
          <label htmlFor="company">Business <span className="hint">(optional)</span></label>
          <input id="company" name="company" placeholder="Company or project name" />
        </div>
      </div>

      <div className="f2">
        <div className="field">
          <label htmlFor="enquiryType">Enquiry type</label>
          <select id="enquiryType" name="enquiryType" defaultValue="Project enquiry">
            {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="service">What do you need?</label>
          <select id="service" name="service" defaultValue="Not sure yet">
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="f2">
        <div className="field">
          <label htmlFor="budget">Budget <span className="hint">(optional)</span></label>
          <input id="budget" name="budget" placeholder="e.g. ₦300,000 – ₦600,000" />
        </div>
        <div className="field">
          <label htmlFor="timeline">Timeline <span className="hint">(optional)</span></label>
          <input id="timeline" name="timeline" placeholder="e.g. live within 3 weeks" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">What are you building?</label>
        <textarea id="message" name="message" required minLength={10} maxLength={2000} placeholder="The problem, what has to work, and anything already in place." />
        {err('message')}
      </div>

      <div className="hp" aria-hidden="true">
        <label>Leave this empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <button className="btn" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send enquiry'}</button>
      <p className="note">Goes straight to {`adeniyimarv@gmail.com`}. No newsletter, no resale.</p>

      <div role="status" aria-live="polite">
        {status.state === 'ok' && (
          <p className="ok">
            {status.copy
              ? 'Sent. It is in Marvel’s inbox and a copy is on its way to your email.'
              : 'Sent. Your message reached Marvel’s inbox — the reply comes from adeniyimarv@gmail.com.'}
          </p>
        )}
        {status.state === 'error' && <p className="fe" style={{ marginTop: 8 }}>{status.message}</p>}
      </div>
    </form>
  );
}
