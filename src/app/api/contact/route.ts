import { NextResponse } from 'next/server';
import { mailConfigured, sendEnquiry, sendReceipt } from '@/lib/mail';
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

  const subject = `${d.enquiryType}: ${d.name}`;

  const receiptSubject = `Your message to Marvel Adeniyi — ${d.enquiryType}`;
  const receiptBody = [
    `Hi ${d.name.split(' ')[0]},`,
    '',
    'Thanks for reaching out. Your message has reached my inbox, and you will get a reply',
    'within one working day.',
    '',
    'Here is a copy of what you sent:',
    '',
    '— — —',
    body,
    '— — —',
    '',
    `If anything is urgent, reply to this email or write to ${site.email}.`,
    '',
    `${site.person}`,
    site.url,
  ].join('\n');

  try {
    await sendEnquiry(subject, body, d.email);
  } catch (err) {
    console.error('contact: enquiry delivery failed', err);
    return NextResponse.json(
      { error: `Your message could not be delivered. Please email ${site.email} directly.` },
      { status: 502 },
    );
  }

  // The visitor's copy is a courtesy: the enquiry is already delivered, so a
  // failure here must never tell them their message was lost.
  let copy = false;
  try {
    await sendReceipt(receiptSubject, receiptBody, d.email);
    copy = true;
  } catch (err) {
    console.error('contact: sender copy failed', err);
  }

  return NextResponse.json({ ok: true, copy });
}
