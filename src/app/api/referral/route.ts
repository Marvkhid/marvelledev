import { NextResponse } from 'next/server';
import { mailConfigured, sendMail } from '@/lib/mail';
import { clientIp, rateLimit, readJson } from '@/lib/ratelimit';
import { referralSchema, tooFast } from '@/lib/validate';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!rateLimit(`ref:${clientIp(req)}`, 4, 600_000)) return NextResponse.json({ error: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
  const parsed = referralSchema.safeParse(await readJson(req, 12_000));
  if (!parsed.success) return NextResponse.json({ error: 'Please complete all required fields and accept the terms.', fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const d = parsed.data;
  if (d.company_website || tooFast(d.startedAt)) return NextResponse.json({ ok: true });
  if (!mailConfigured()) return NextResponse.json({ error: 'Referrals aren’t connected yet. Please email your referral instead.' }, { status: 503 });
  try {
    await sendMail(`New referral: ${d.clientBusiness}`,
      `Referrer: ${d.referrerName}\nReferrer contact: ${d.referrerContact}\n\nProspect: ${d.clientName}\nBusiness: ${d.clientBusiness}\nProspect contact: ${d.clientContact ?? '-'}\n\nOpportunity:\n${d.details}\n\nConsent to contact and data-handling terms: yes`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'We couldn’t submit your referral. Please try again.' }, { status: 502 });
  }
}
