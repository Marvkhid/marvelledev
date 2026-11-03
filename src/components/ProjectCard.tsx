import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/site';

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="p-card">
      <Link href={`/projects/${project.slug}`} className="p-media" aria-label={`${project.name} case study`}>
        <Image
          src={project.shot}
          alt={`${project.name} homepage`}
          fill
          sizes="(max-width: 680px) 100vw, (max-width: 1100px) 90vw, 560px"
          priority={priority}
        />
      </Link>
      <div className="p-body">
        <div className="p-head">
          <span className="p-kind">{project.kind}</span>
          <a className="ext mono" href={project.url} target="_blank" rel="noopener noreferrer">Live site ↗</a>
        </div>
        <h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3>
        <p>{project.tagline}</p>
        <div className="p-tags">
          {project.tech.slice(0, 4).map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>
        <div className="p-links">
          <Link className="link-arrow" href={`/projects/${project.slug}`}>Read the case study <span>→</span></Link>
        </div>
      </div>
    </article>
  );
}
