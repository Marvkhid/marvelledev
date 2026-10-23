import { FAQ } from '@/lib/knowledge';

export function Faq({ limit }: { limit?: number }) {
  return <div>{FAQ.slice(0, limit).map((f) => <details key={f.q}><summary>{f.q}</summary><p className="mut">{f.a}</p></details>)}</div>;
}
