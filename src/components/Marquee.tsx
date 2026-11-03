export function Marquee({ items }: { items: string[] }) {
  const line = items.join(' · ');
  return (
    <div className="ticker" aria-label={`Technologies: ${items.join(', ')}`}>
      <div className="ticker-track">
        <span>{line}</span>
        <span aria-hidden="true">{line}</span>
      </div>
    </div>
  );
}
