import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="wrap" style={{ textAlign: 'center', padding: '110px 24px' }}>
      <p className="eyebrow" style={{ justifyContent: 'center' }}>404</p>
      <h1>This page drifted offline.</h1>
      <p className="lead" style={{ margin: '16px auto 26px' }}>
        The page you were looking for isn’t here. The work, the services and the contact form are.
      </p>
      <div className="row" style={{ justifyContent: 'center' }}>
        <Link className="btn" href="/">Back to home</Link>
        <Link className="btn-ghost" href="/projects">See the work</Link>
      </div>
    </section>
  );
}
