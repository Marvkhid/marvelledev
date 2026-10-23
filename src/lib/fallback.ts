import { FAQ, KNOWLEDGE, SUGGESTIONS, type KB } from './knowledge';
import { site, type Link } from './site';

export type Reply = { text: string; links?: Link[]; suggestions?: string[] };

const STOP = new Set('a an the is are to of for in on and or do does can you he his him me my i we it what how who which with about tell please'.split(' '));
const tokens = (s: string) => s.toLowerCase().replace(/[^a-z0-9&\s]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w));

const EXTRACT = /(system prompt|ignore (all |any )?(previous|prior|above)|disregard|reveal.*(prompt|instruction|key|secret)|api[ -]?key|environment variable|\.env|developer mode|jailbreak|act as|pretend (to be|you are))/i;
export const isExtractionAttempt = (q: string) => EXTRACT.test(q);

// Keywords must start at a word boundary, so 'api' does not match 'capital'.
const esc = (k: string) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasWord = (text: string, k: string) => new RegExp('(^|[^a-z0-9])' + esc(k)).test(text);

function score(q: string, e: KB) {
  const lq = q.toLowerCase();
  let s = 0;
  for (const k of e.keywords) if (hasWord(lq, k)) s += k.includes(' ') ? 4 : 3;
  const qt = new Set(tokens(q));
  for (const t of tokens(e.title)) if (qt.has(t)) s += 1;
  return s;
}

export function topEntries(q: string, k = 3): KB[] {
  return KNOWLEDGE.map((e) => ({ e, s: score(q, e) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, k).map((x) => x.e);
}

function faqMatch(q: string): { a: string; s: number } | null {
  const qt = new Set(tokens(q));
  let best: { a: string; s: number } | null = null;
  for (const f of FAQ) {
    const ft = tokens(f.q);
    const overlap = ft.filter((t) => qt.has(t)).length;
    const s = ft.length ? overlap / Math.max(ft.length, qt.size) : 0;
    if (overlap >= 2 && (!best || s > best.s)) best = { a: f.a, s };
  }
  return best && best.s >= 0.5 ? best : null;
}

export const REFUSAL: Reply = { text: 'I can’t help with that. I only share public information about Marvellous, his projects and services. Want to hear about one of those?', suggestions: SUGGESTIONS.slice(0, 3) };

export function fallbackReply(q: string): Reply {
  const text = q.trim();
  if (isExtractionAttempt(text)) return REFUSAL;
  if (/^(hi|hello|hey|good (morning|afternoon|evening))\b/i.test(text) && text.length < 25) {
    return { text: 'Hello! I can tell you about Marvellous’s experience, his projects, his services, or help you prepare a website enquiry.', suggestions: SUGGESTIONS.slice(0, 4) };
  }
  if (/\b(are you|r u) (marvellous|marvel|him|a human|real)\b/i.test(text)) {
    return { text: 'I’m Marv AI, Marvellous’s AI assistant, not Marvellous himself. I can answer questions about his work, or you can reach him directly.', links: [{ label: 'Contact page', href: '/contact' }] };
  }
  const ranked = topEntries(text, 2);
  if (ranked.length) {
    const [a, b] = ranked;
    const extra = b && b.id !== a.id && score(text, b) >= 6 ? `\n\n${b.answer}` : '';
    return { text: a.answer + extra, links: [...(a.links ?? []), ...(extra ? b.links ?? [] : [])].slice(0, 3) };
  }
  const f = faqMatch(text);
  if (f) return { text: f.a };
  return {
    text: 'I don’t have that information. I can only speak about Marvellous, his projects and services. For anything else about a project, the quickest route is to ask him directly.',
    links: [{ label: 'Contact Marvellous', href: '/contact' }],
    suggestions: SUGGESTIONS.slice(0, 4),
  };
}

export const emailLink = `mailto:${site.email}`;
