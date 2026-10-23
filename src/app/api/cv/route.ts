import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const FILE = path.join(process.cwd(), 'public', 'cv', 'Marvellous-Adeniyi-CV.pdf');

export async function GET() {
  try {
    const pdf = await readFile(FILE);
    return new Response(new Uint8Array(pdf), {
      headers: { 'content-type': 'application/pdf', 'content-disposition': 'attachment; filename="Marvellous-Adeniyi-CV.pdf"', 'cache-control': 'public, max-age=300' },
    });
  } catch {
    return new Response('<!doctype html><meta charset="utf-8"><title>CV</title><body style="font-family:sans-serif;padding:40px"><h1>CV coming soon</h1><p>The CV hasn’t been published yet. Please <a href="/contact">contact Marvellous</a>.</p>', { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } });
  }
}
