import { buildSystemPrompt } from './prompts';
import type { KB } from './knowledge';

// Free-tier text models confirmed on Google's pricing page in Oct 2026. Re-check before changing.
const ALLOWED = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-3.6-flash', 'gemini-3.8-flash'];
const DEFAULT_MODEL = 'gemini-3.5-flash-lite';

export type ChatTurn = { role: 'user' | 'assistant'; content: string };
export class AiUnavailable extends Error {}

let cooldownUntil = 0;
let day = new Date().toISOString().slice(0, 10);
let used = 0;

export function aiAvailable() {
  if (!process.env.GEMINI_API_KEY) return false;
  if (Date.now() < cooldownUntil) return false;
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) { day = today; used = 0; }
  return used < (Number(process.env.CHAT_DAILY_AI_LIMIT) || 200);
}

export async function askGemini(history: ChatTurn[], context: KB[]): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AiUnavailable('no key');
  const requested = process.env.GEMINI_MODEL ?? DEFAULT_MODEL;
  const model = ALLOWED.includes(requested) ? requested : DEFAULT_MODEL; // never taken from the client
  const contents = history.map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }));
  while (contents.length && contents[0].role !== 'user') contents.shift();
  if (!contents.length) throw new AiUnavailable('empty');
  used += 1;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 9000);
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt(context) }] },
        contents,
        generationConfig: { maxOutputTokens: 600, temperature: 0.4 },
      }),
      signal: ctrl.signal,
    });
    if (res.status === 429 || res.status === 403) { cooldownUntil = Date.now() + 10 * 60_000; throw new AiUnavailable('quota'); }
    if (res.status >= 500) { cooldownUntil = Date.now() + 60_000; throw new AiUnavailable('provider'); }
    if (!res.ok) { cooldownUntil = Date.now() + 5 * 60_000; throw new AiUnavailable('config'); }
    const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('').trim();
    if (!text) throw new AiUnavailable('empty reply');
    return text.slice(0, 1500);
  } catch (e) {
    if (e instanceof AiUnavailable) throw e;
    cooldownUntil = Date.now() + 30_000; // timeout / network: do not hammer the free quota
    throw new AiUnavailable('network');
  } finally {
    clearTimeout(timer);
  }
}
