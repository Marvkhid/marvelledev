import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="w" style={{ textAlign: 'center', padding: '120px 24px' }}>
      <p className="tag">// 404</p>
      <h1>This page drifted offline.</h1>
      <p className="mut lead" style={{ margin: '18px auto' }}>The page you’re looking for doesn’t exist, but the rest of the site does.</p>
      <Link className="btn" href="/">Back to home</Link>
    </section>
  );
}
