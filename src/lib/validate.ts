import { z } from 'zod';

const clean = (max: number) => z.string().trim().max(max).transform((s) => s.replace(/[\r\n]+/g, ' '));
const text = (max: number) => z.string().trim().max(max);
const spam = { company_website: z.string().max(200).optional(), startedAt: z.number().optional() };

export const chatSchema = z.object({
  messages: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().trim().min(1).max(500) })).min(1).max(8),
});

export const contactSchema = z.object({
  name: clean(100).pipe(z.string().min(2)),
  email: clean(150).pipe(z.string().email()),
  phone: clean(30).optional(),
  business: clean(120).optional(),
  projectType: clean(60).pipe(z.string().min(2)),
  budget: clean(60).optional(),
  message: text(2000).pipe(z.string().min(10)),
  timeline: clean(80).optional(),
  ...spam,
});

export const referralSchema = z.object({
  referrerName: clean(100).pipe(z.string().min(2)),
  referrerContact: clean(150).pipe(z.string().min(5)),
  clientName: clean(100).pipe(z.string().min(2)),
  clientBusiness: clean(120).pipe(z.string().min(2)),
  clientContact: clean(150).optional(),
  details: text(1500).pipe(z.string().min(10)),
  consent: z.literal(true),
  ...spam,
});

export const tooFast = (startedAt?: number) => typeof startedAt === 'number' && Date.now() - startedAt < 1500;
