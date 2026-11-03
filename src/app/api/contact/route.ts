import { NextResponse } from 'next/server';
import { mailConfigured, sendMail } from '@/lib/mail';
import { clientIp, rateLimit, readJson } from '@/lib/ratelimit';
import { contactSchema, tooFast } from '@/lib/validate';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

/**
 * Duplicate guard: the same person sending the same message twice within
 * ten minutes is almost always a double submit, not a second enquiry.
 * In-memory only; it is a courtesy check, not a store of enquiries.
 */
const recent = new Map<string, number>();
const DEDUPE_MS = 10 * 60_000;

function isDuplicate(key: string) {
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > DEDUPE_MS) recent.delete(k);
  const seen = recent.get(key);
  recent.set(key, now);
  return typeof seen === 'number' && now - seen < DEDUPE_MS;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`contact:${ip}`, 5, 600_000)) {
    return NextResponse.json({ error: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
  }

  const parsed = contactSchema.safeParse(await readJson(req, 12_000));
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const d = parsed.data;
  if (d.company_website || tooFast(d.startedAt)) return NextResponse.json({ ok: true }); // silently drop bots

  if (isDuplicate(`${d.email}|${d.message}`)) {
    return NextResponse.json({ error: 'This message was just sent. Give it a moment, or email directly if it was urgent.' }, { status: 409 });
  }

  if (!mailConfigured()) {
    return NextResponse.json(
      { error: `Email is not connected on this deployment yet. Please send it to ${site.email} directly.` },
      { status: 503 },
    );
  }

  const submitted = new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos', dateStyle: 'full', timeStyle: 'short' });

  const body = [
    `Enquiry type: ${d.enquiryType}`,
    `Service interest: ${d.service || '-'}`,
    '',
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || '-'}`,
    `Business: ${d.company || '-'}`,
    `Budget: ${d.budget || '-'}`,
    `Timeline: ${d.timeline || '-'}`,
    '',
    'Message:',
    d.message,
    '',
    '—',
    `Submitted: ${submitted} (Africa/Lagos)`,
    `Source: ${site.url}/contact`,
  ].join('\n');

  try {
    await sendMail(`${d.enquiryType}: ${d.name}`, body, d.email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: `Your message could not be delivered. Please email ${site.email} directly.` },
      { status: 502 },
    );
  }
}
