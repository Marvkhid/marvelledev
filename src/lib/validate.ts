import { z } from 'zod';

const clean = (max: number) => z.string().trim().max(max).transform((s) => s.replace(/[\r\n]+/g, ' '));
const text = (max: number) => z.string().trim().max(max);
const spam = { company_website: z.string().max(200).optional(), startedAt: z.number().optional() };

export const ENQUIRY_TYPES = [
  'Project enquiry',
  'Service enquiry',
  'Support request',
  'Collaboration',
  'Something else',
] as const;

export const contactSchema = z.object({
  name: clean(100).pipe(z.string().min(2)),
  email: clean(150).pipe(z.string().email()),
  phone: clean(30).optional(),
  company: clean(120).optional(),
  enquiryType: z.enum(ENQUIRY_TYPES),
  service: clean(80).optional(),
  budget: clean(60).optional(),
  timeline: clean(80).optional(),
  message: text(2000).pipe(z.string().min(10)),
  ...spam,
});

export const tooFast = (startedAt?: number) => typeof startedAt === 'number' && Date.now() - startedAt < 1500;
