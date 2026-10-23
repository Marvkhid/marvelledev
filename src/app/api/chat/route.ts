import { NextResponse } from 'next/server';
import { askGemini, aiAvailable, AiUnavailable } from '@/lib/gemini';
import { fallbackReply, isExtractionAttempt, REFUSAL, topEntries } from '@/lib/fallback';
import { clientIp, rateLimit, readJson } from '@/lib/ratelimit';
import { chatSchema } from '@/lib/validate';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`chat-m:${ip}`, 8, 60_000) || !rateLimit(`chat-h:${ip}`, 60, 3_600_000)) {
    return NextResponse.json({ error: 'You’re sending messages quickly. Please wait a moment and try again.' }, { status: 429 });
  }
  const body = await readJson(req, 8_000);
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Please send a message between 1 and 500 characters.' }, { status: 400 });

  const history = parsed.data.messages;
  const last = history[history.length - 1];
  if (last.role !== 'user') return NextResponse.json({ error: 'Invalid conversation.' }, { status: 400 });
  if (isExtractionAttempt(last.content)) return NextResponse.json({ ...REFUSAL, source: 'fallback' });

  if (aiAvailable()) {
    try {
      const context = topEntries(history.slice(-3).map((m) => m.content).join(' '), 4);
      const text = await askGemini(history.slice(-6), context);
      return NextResponse.json({ text, source: 'ai' });
    } catch (e) {
      if (!(e instanceof AiUnavailable)) console.error('chat: unexpected error');
    }
  }
  return NextResponse.json({ ...fallbackReply(last.content), source: 'fallback', limited: Boolean(process.env.GEMINI_API_KEY) });
}
