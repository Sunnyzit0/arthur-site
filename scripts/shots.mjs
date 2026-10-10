// Gera as imagens do site: prints dos projetos, imagem de compartilhamento (og.png)
// e ícone para iPhone. Rode com `npm run shots` sempre que um projeto mudar.
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { perfil, projetos } from '../src/data.js';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const pub = (p) => raiz + 'public/' + p;
const LARGURA = 960; // largura final dos prints (2x o tamanho exibido no card)
const ALTURA_MAX = 3400; // corta páginas muito longas

const browser = await chromium.launch();

async function printProjeto(p) {
  // reducedMotion pula aberturas e animações de entrada dos sites
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    locale: 'pt-BR',
  });
  const page = await ctx.newPage();
  await page.goto(p.url, { waitUntil: 'networkidle', timeout: 60_000 });
  // Rola até o fim para disparar imagens lazy e animações por scroll
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  const png = await page.screenshot({ fullPage: true });
  await ctx.close();

  const img = sharp(png).resize({ width: LARGURA });
  const { data, info } = await img.toBuffer({ resolveWithObject: true });
  const altura = Math.min(info.height, ALTURA_MAX);
  await sharp(data)
    .extract({ left: 0, top: 0, width: info.width, height: altura })
    .webp({ quality: 78 })
    .toFile(pub(`projetos/${p.slug}.webp`));
  console.log(`✔ ${p.slug}.webp  ${info.width}x${altura}`);
}

async function fontes() {
  const f = (pkg, file) => readFile(raiz + `node_modules/@fontsource-variable/${pkg}/files/${file}`).then((b) => b.toString('base64'));
  return {
    mono: await f('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2'),
    sans: await f('inter', 'inter-latin-wght-normal.woff2'),
  };
}

async function og() {
  const { mono, sans } = await fontes();
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face{font-family:M;src:url(data:font/woff2;base64,${mono}) format('woff2');font-weight:100 800}
    @font-face{font-family:S;src:url(data:font/woff2;base64,${sans}) format('woff2');font-weight:100 900}
    *{margin:0;box-sizing:border-box}
    body{width:1200px;height:630px;background:#0b0d10;color:#d6dde6;font-family:M;padding:56px 64px;
      background-image:radial-gradient(#1a2028 1.5px,transparent 1.5px);background-size:28px 28px;display:flex;flex-direction:column}
    .bar{display:flex;gap:10px;margin-bottom:44px}.bar i{width:16px;height:16px;border-radius:50%;background:#ff5f57}
    .bar i:nth-child(2){background:#febc2e}.bar i:nth-child(3){background:#28c840}
    .p{color:#8b97a5;font-size:26px}.p b{color:#4ade80;font-weight:600}.p u{color:#38bdf8;text-decoration:none}
    h1{font-size:78px;font-weight:800;line-height:1.05;margin:18px 0 22px;letter-spacing:-1px}
    h1 span{color:#4ade80}
    .r{color:#38bdf8;font-size:30px}.r b{color:#4ade80}
    .s{font-family:S;color:#a3aebb;font-size:30px;margin-top:22px;max-width:900px;line-height:1.4}
    .f{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:24px;color:#8b97a5}
    .ok{color:#4ade80}.tag{border:2px solid #222932;border-radius:999px;padding:6px 18px;color:#4ade80}
  </style></head><body>
    <div class="bar"><i></i><i></i><i></i></div>
    <p class="p"><b>${perfil.usuario}@${perfil.host}</b>:<u>~</u>$ whoami</p>
    <h1>${perfil.nome}<span>▋</span></h1>
    <p class="r"><b>&gt;</b> ${perfil.cargo} · ${perfil.local}</p>
    <p class="s">Do cabo de fibra ao deploy: sites e sistemas web para negócios locais.</p>
    <div class="f"><span><span class="ok">●</span> ${perfil.status}</span><span class="tag">~/${perfil.handle}</span></div>
  </body></html>`;
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: pub('og.png') });
  await page.close();
  console.log('✔ og.png');
}

async function icone() {
  const svg = await readFile(pub('favicon.svg'), 'utf8');
  const { mono } = await fontes();
  const page = await browser.newPage({ viewport: { width: 180, height: 180 } });
  await page.setContent(
    `<style>@font-face{font-family:M;src:url(data:font/woff2;base64,${mono})}*{margin:0}svg{width:180px;height:180px;display:block}</style>${svg.replace(/font-family="[^"]*"/, 'font-family="M"')}`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: pub('apple-touch-icon.png') });
  await page.close();
  console.log('✔ apple-touch-icon.png');
}

await mkdir(pub('projetos'), { recursive: true });
// `npm run shots -- recanto` gera só um projeto.
// `npm run shots -- vk-store http://localhost:4173` tira o print de outro endereço
// (útil quando o site está fora do ar ou protegido por login).
const [so, urlManual] = process.argv.slice(2);
for (const p of projetos) {
  if (so && p.slug !== so) continue;
  try {
    await printProjeto(urlManual ? { ...p, url: urlManual } : p);
  } catch (e) {
    console.error(`✘ ${p.slug}: ${e.message}`);
  }
}
if (!so) {
  await og();
  await icone();
}
await browser.close();
