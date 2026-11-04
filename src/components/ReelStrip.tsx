import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/site';

/** The reel: every live product as a frame you can scrub through. */
export function ReelStrip() {
  return (
    <section className="reel" id="reel" data-chapter="The reel">
      <div className="reel-head wrap">
        <p className="eyebrow">The reel</p>
        <h2>Six frames. Six live products.</h2>
      </div>
      <div className="reel-track">
        {projects.map((project, i) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="reel-frame">
            <Image
              src={project.shot}
              alt={`${project.name} — live screenshot`}
              fill
              sizes="(max-width: 680px) 84vw, 440px"
            />
            <span className="reel-meta">
              <b>{project.name}</b>
              <em>{String(i + 1).padStart(2, '0')} / 06</em>
            </span>
          </Link>
        ))}
      </div>
      <p className="reel-hint wrap">Drag or scroll the reel · every frame is a live product</p>
    </section>
  );
}
