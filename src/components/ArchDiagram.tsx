export function ArchDiagram() {
  return (
    <div className="arch" role="img" aria-label="Interface connects to API, which connects to the database">
      <b>Interface<small>Next.js · React</small></b><i /><b>API<small>NestJS · REST</small></b><i /><b>Database<small>PostgreSQL · Prisma</small></b>
    </div>
  );
}
