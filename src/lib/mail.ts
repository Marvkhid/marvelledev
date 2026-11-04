import nodemailer from 'nodemailer';
import { site } from './site';

/**
 * One way in, two ways out.
 *
 * Every enquiry is delivered to the owner's inbox first. Only when that has
 * succeeded do we send the visitor their own copy, so a copy can never be the
 * only proof that a message was sent.
 *
 * Providers, in order of preference:
 *   1. SMTP  — Gmail App Password, or any host. Sends to anyone, copies included.
 *   2. Resend — RESEND_API_KEY. Without a verified domain Resend only accepts
 *      the account owner's address, so the copy step reports false.
 */

const owner = () => process.env.MAIL_TO || site.email;

const fromAddress = () =>
  process.env.MAIL_FROM || process.env.SMTP_USER || 'onboarding@resend.dev';

const smtpReady = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

export const mailConfigured = () => smtpReady() || Boolean(process.env.RESEND_API_KEY);

type Mail = { to: string; subject: string; text: string; replyTo?: string };

async function send({ to, subject, text, replyTo }: Mail): Promise<'smtp' | 'resend'> {
  const safeSubject = subject.replace(/[\r\n]+/g, ' ').slice(0, 150);

  if (smtpReady()) {
    const port = Number(process.env.SMTP_PORT) || 465;
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER as string, pass: process.env.SMTP_PASS as string },
    });
    await transport.sendMail({
      from: fromAddress(),
      to,
      replyTo,
      subject: safeSubject,
      text,
    });
    return 'smtp';
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('No mail transport configured');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: `MarvelleDev <${fromAddress()}>`,
      to: [to],
      reply_to: replyTo,
      subject: safeSubject,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend rejected the message (${res.status})`);
  return 'resend';
}

/** The enquiry itself: always to the owner, with the visitor as Reply-To. */
export function sendEnquiry(subject: string, body: string, replyTo: string) {
  return send({ to: owner(), subject, text: body, replyTo });
}

/** The visitor's copy: to them, replying reaches the owner. */
export function sendReceipt(subject: string, body: string, to: string) {
  return send({ to, subject, text: body, replyTo: owner() });
}
