// Pós-build: gera o HTML final já com o conteúdo (SEO e primeira pintura rápida),
// além de 404.html, sitemap.xml e robots.txt.
import { createHash } from 'node:crypto';
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const dist = raiz + 'dist/';

// Na Vercel, VERCEL_PROJECT_PRODUCTION_URL é o domínio de produção do projeto.
// Para forçar outro (ex.: domínio próprio), defina SITE_URL nas variáveis de ambiente.
const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://arthur-site.vercel.app'
).replace(/\/$/, '');

const { render } = await import(pathToFileURL(raiz + 'dist-ssr/entry-server.js').href);
let html = await readFile(dist + 'index.html', 'utf8');

// Pré-carrega só as fontes latin (o resto dos subconjuntos é baixado sob demanda)
const fontes = (await readdir(dist + 'assets'))
  .filter((f) => /^(jetbrains-mono|inter)-latin-wght-normal.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ');

html = html
  .replace('<!--app-->', render())
  .replaceAll('__SITE_URL__', SITE_URL)
  .replace('</title>', `</title>\n    ${fontes}`);

// Content-Security-Policy: só roda script do próprio site, mais os scripts
// inline do index.html liberados pelo hash exato do conteúdo.
const hashes = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
  ([, codigo]) => `'sha256-${createHash('sha256').update(codigo).digest('base64')}'`,
);
const csp = [
  "default-src 'self'",
  `script-src 'self' ${hashes.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.github.com",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');
html = html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`);

await writeFile(dist + 'index.html', html);

// 404 no estilo terminal, sem depender do app
const pagina404 = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>404 · Arquivo ou diretório inexistente</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
  :root{color-scheme:dark}
  *{margin:0;box-sizing:border-box}
  body{min-height:100vh;display:grid;place-items:center;padding:24px;background:#0b0d10;color:#d6dde6;
    font:15px/1.7 ui-monospace,'Cascadia Code',Consolas,monospace;
    background-image:radial-gradient(#222932 1px,transparent 1px);background-size:24px 24px}
  .w{width:min(640px,100%);background:#12161b;border:1px solid #222932;border-radius:10px;overflow:hidden}
  .b{display:flex;gap:6px;padding:10px 14px;background:#181d24;border-bottom:1px solid #222932}
  .b i{width:11px;height:11px;border-radius:50%;background:#ff5f57}.b i+i{background:#febc2e}.b i+i+i{background:#28c840}
  .c{padding:20px 22px}
  .u{color:#4ade80;font-weight:700}.p{color:#38bdf8}.r{color:#f87171}.m{color:#8b97a5}
  a{color:#4ade80}
  .k{display:inline-block;width:.6em;height:1.1em;vertical-align:text-bottom;background:#4ade80;animation:k 1s step-end infinite}
  @keyframes k{50%{opacity:0}}
</style>
</head>
<body>
<div class="w"><div class="b"><i></i><i></i><i></i></div><div class="c">
<p><span class="u">visitante@ato</span>:<span class="p">~</span>$ cd <span id="c"></span></p>
<p class="r">bash: cd: <span id="d"></span>: Arquivo ou diretório inexistente</p>
<p class="m">erro 404 · essa página não existe (ou ainda não foi commitada).</p>
<br>
<p><span class="u">visitante@ato</span>:<span class="p">~</span>$ <a href="/">cd ~</a> <span class="k"></span></p>
</div></div>
<script>var p=decodeURIComponent(location.pathname);document.getElementById('c').textContent=p;document.getElementById('d').textContent=p;</script>
</body>
</html>
`;
await writeFile(dist + '404.html', pagina404);

const hoje = new Date().toISOString().slice(0, 10);
await writeFile(
  dist + 'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><lastmod>${hoje}</lastmod><priority>1.0</priority></url>
</urlset>
`,
);
await writeFile(dist + 'robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

await rm(raiz + 'dist-ssr', { recursive: true, force: true });
console.log(`✔ pré-renderizado (${SITE_URL}) · 404.html · sitemap.xml · robots.txt`);
