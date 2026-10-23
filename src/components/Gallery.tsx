import Image from 'next/image';
import { workspace } from '@/lib/site';

export function Gallery() {
  return (
    <div className="gal">
      {workspace.map((w, i) => (
        <figure key={w.src}>
          <Image src={w.src} alt={w.alt} fill sizes="(max-width:900px) 100vw, 40vw" priority={i === 0} />
          <figcaption>{w.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
