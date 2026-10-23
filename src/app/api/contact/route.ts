import { NextResponse } from 'next/server';
import { mailConfigured, sendMail } from '@/lib/mail';
import { clientIp, rateLimit, readJson } from '@/lib/ratelimit';
import { contactSchema, tooFast } from '@/lib/validate';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 600_000)) return NextResponse.json({ error: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
  const parsed = contactSchema.safeParse(await readJson(req, 12_000));
  if (!parsed.success) return NextResponse.json({ error: 'Please check the highlighted fields.', fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const d = parsed.data;
  if (d.company_website || tooFast(d.startedAt)) return NextResponse.json({ ok: true }); // silently drop bots
  if (!mailConfigured()) return NextResponse.json({ error: 'The contact form isn’t connected yet. Please email or WhatsApp instead.' }, { status: 503 });
  try {
    await sendMail(`New enquiry: ${d.projectType} from ${d.name}`,
      `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone ?? '-'}\nBusiness: ${d.business ?? '-'}\nProject type: ${d.projectType}\nBudget: ${d.budget ?? '-'}\nTimeline: ${d.timeline ?? '-'}\n\n${d.message}`, d.email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'We couldn’t send your message. Please try again or email directly.' }, { status: 502 });
  }
}
