import Neofetch from '../components/Neofetch';
import { cursos, perfil, projetos, servicos, skills, sobre, trajetoria } from '../data';
import { semMovimento } from '../lib/hooks';
import { TEMAS } from '../lib/theme';
import { zap } from '../lib/whatsapp';

// Cada comando recebe (args, ctx) e devolve uma lista de linhas (nós React).
// ctx: { tema, setTema, fechar, irPara, abrir, historico }

const C = ({ c, children }) => <span className={`t-${c}`}>{children}</span>;
const Link = ({ href, children }) => (
  <a className="tl-link" href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

export const USUARIO = 'visitante';

const TOM = {
  live: { icone: '●', cor: 'accent' },
  proto: { icone: '◐', cor: 'yellow' },
  off: { icone: '○', cor: 'red' },
};

export const SECOES = {
  '~': 'inicio',
  inicio: 'inicio',
  projetos: 'projetos',
  servicos: 'servicos',
  serviços: 'servicos',
  sobre: 'sobre',
  atividade: 'atividade',
  contato: 'contato',
};

const REDES = {
  github: perfil.github,
  linkedin: perfil.linkedin,
  instagram: perfil.instagram,
  whatsapp: zap('Olá Arthur! Vim pelo terminal do seu site.'),
  email: `mailto:${perfil.email}`,
};

const ARQUIVOS = ['sobre.md', 'curriculo.txt', 'contato.txt', 'stack.json'];

const FRASES = [
  'Funciona na minha máquina. — todo dev, pelo menos uma vez na vida',
  'Deploy na sexta-feira é esporte radical.',
  'O melhor site é o que o cliente consegue atualizar sozinho.',
  'Primeiro faça funcionar. Depois faça bonito. Depois faça rápido.',
  'Comentário bom explica o porquê, não o quê.',
  'git commit -m "ajustes" é um pedido de socorro.',
  'Café não é vício, é infraestrutura.',
  'Fibra óptica: a luz é rápida, mas o cliente quer pra ontem.',
  'Todo sistema legado já foi o projeto novo e empolgante de alguém.',
  'Se está difícil de testar, está difícil de entender.',
];

const VACA = (msg) => {
  const borda = '_'.repeat(msg.length + 2);
  const base = '-'.repeat(msg.length + 2);
  return ` ${borda}
< ${msg} >
 ${base}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
};

const CAFE = `      ( (
       ) )
    ........
    |      |]
    \\      /
     \`----'`;

const pre = (texto, cor) => <span className={cor ? `t-${cor}` : undefined}>{texto}</span>;

function projeto(p) {
  return [
    <>
      <C c="accent">●</C> <strong>{p.nome}</strong> <C c="muted">· {p.tipo} · {p.status}</C>
    </>,
    <C c="muted">{p.descricao}</C>,
    ...p.destaques.map(([t, tec]) => (
      <>
        {'  '}
        <C c="accent">▹</C> {t}
        {tec && <C c="dim"> // {tec}</C>}
      </>
    )),
    <>
      {'  '}
      <C c="cyan">stack:</C> {p.stack.join(' · ')}
    </>,
    <>
      {'  '}
      {p.tom === 'off' ? <C c="red">{p.dominio} (fora do ar)</C> : <Link href={p.url}>{p.dominio} ↗</Link>}
      {'   '}
      <Link href={p.repo}>código ↗</Link>
    </>,
  ];
}

function cat(arquivo) {
  const alvo = arquivo.replace(/^\.\//, '').replace(/^~\//, '');
  if (alvo === 'sobre.md') return [<C c="accent"># {perfil.nome}</C>, ...sobre.map((p) => p), ''];
  if (alvo === 'stack.json') {
    return [
      '{',
      ...Object.entries(skills).map(([k, v], i, a) => (
        <>
          {'  '}
          <C c="cyan">"{k}"</C>: [{v.map((x) => `"${x}"`).join(', ')}]{i < a.length - 1 ? ',' : ''}
        </>
      )),
      '}',
    ];
  }
  if (alvo === 'curriculo.txt') {
    return [
      <C c="accent">== {perfil.nome.toUpperCase()} ==</C>,
      <C c="muted">
        {perfil.cargo} · {perfil.local} · {perfil.status}
      </C>,
      '',
      <C c="yellow">-- trajetória --</C>,
      ...trajetoria.map((t) => (
        <>
          <C c="dim">{t.quando.padEnd(16)}</C> <strong>{t.titulo}</strong> <C c="cyan">@ {t.onde}</C>
        </>
      )),
      '',
      <C c="yellow">-- cursos --</C>,
      ...cursos.map((c) => (
        <>
          <C c="dim">{c.ano.padEnd(16)}</C> {c.nome} <C c="muted">({c.onde})</C>
        </>
      )),
    ];
  }
  if (alvo === 'contato.txt') return contato();
  if (alvo === '.segredo') {
    return [
      <C c="yellow">🔑 você achou o arquivo secreto!</C>,
      <>
        prêmio: digite <C c="accent">sudo contratar</C> e veja o que acontece.
      </>,
    ];
  }
  const p = projetos.find((x) => alvo === x.slug || alvo === `projetos/${x.slug}`);
  if (p) return projeto(p);
  if (alvo === 'projetos' || alvo === 'projetos/') return [<C c="red">cat: projetos: É um diretório (tente `ls projetos`)</C>];
  return [<C c="red">cat: {arquivo}: Arquivo ou diretório inexistente</C>];
}

function contato() {
  return [
    <>
      <C c="cyan">whatsapp </C> <Link href={REDES.whatsapp}>{perfil.telefone}</Link>
    </>,
    <>
      <C c="cyan">email    </C> <Link href={REDES.email}>{perfil.email}</Link>
    </>,
    <>
      <C c="cyan">instagram</C> <Link href={perfil.instagram}>@ato.js</Link>
    </>,
    <>
      <C c="cyan">github   </C> <Link href={perfil.github}>{perfil.githubUser}</Link>
    </>,
    <>
      <C c="cyan">linkedin </C> <Link href={perfil.linkedin}>in/arthuzinho</Link>
    </>,
    '',
    <>
      <C c="muted">ou digite</C> <C c="accent">orcamento</C> <C c="muted">para ir ao formulário.</C>
    </>,
  ];
}

const AJUDA = [
  ['help', 'mostra esta ajuda'],
  ['whoami', 'quem é você (e quem sou eu)'],
  ['sobre', 'um pouco da minha história'],
  ['neofetch', 'informações do sistema (no caso, eu)'],
  ['projetos', 'lista os projetos'],
  ['cat <arquivo>', 'lê um arquivo: sobre.md, curriculo.txt, recanto…'],
  ['abrir <nome>', 'abre um projeto ou rede social em nova aba'],
  ['servicos', 'o que eu faço por você'],
  ['contato', 'como falar comigo'],
  ['orcamento', 'vai direto para o formulário'],
  ['cd <seção>', 'navega pela página: projetos, sobre, contato…'],
  ['tema [nome]', 'troca as cores do site'],
  ['ls · pwd · date · echo · uname · history', 'os clássicos'],
  ['clear', 'limpa a tela (Ctrl+L)'],
  ['exit', 'fecha o terminal (Esc)'],
];

const comandos = {
  help: {
    run: () => [
      <C c="muted">comandos disponíveis:</C>,
      ...AJUDA.map(([c, d]) => (
        <span className="tl-ajuda">
          <C c="accent">{c}</C>
          <C c="muted">{d}</C>
        </span>
      )),
      '',
      <C c="dim">Tab completa · ↑↓ histórico · tem easter eggs escondidos 👀</C>,
    ],
  },
  ajuda: { alias: 'help' },
  whoami: {
    run: () => [
      USUARIO,
      <C c="muted">
        (o dono da máquina é o {perfil.nome}. digite <C c="accent">sobre</C> para conhecer)
      </C>,
    ],
  },
  sobre: { run: () => cat('sobre.md') },
  about: { alias: 'sobre' },
  neofetch: { run: () => [<Neofetch compacto />] },
  fastfetch: { alias: 'neofetch' },
  projetos: {
    run: () => [
      ...projetos.map((p) => (
        <>
          <C c={TOM[p.tom].cor}>{TOM[p.tom].icone}</C> <strong>{p.slug.padEnd(12)}</strong>
          <C c="muted">{p.tipo.padEnd(30)}</C>
          {p.tom === 'off' ? <C c="red">fora do ar</C> : <Link href={p.url}>{p.dominio}</Link>}
        </>
      )),
      '',
      <>
        <C c="dim">detalhes:</C> <C c="accent">cat {projetos[0].slug}</C> <C c="dim">· abrir:</C>{' '}
        <C c="accent">abrir {projetos[0].slug}</C>
      </>,
    ],
  },
  servicos: {
    run: () => [
      ...servicos.map((s) => (
        <>
          <C c="accent">{s.pacote}</C>
          <C c="dim">/stable</C> <C c="muted">— {s.texto}</C>
        </>
      )),
      '',
      <>
        <C c="dim">instalar:</C> <C c="accent">sudo contratar</C>
      </>,
    ],
  },
  serviços: { alias: 'servicos' },
  contato: { run: contato },
  ls: {
    run: (args) => {
      const flags = args.filter((a) => a.startsWith('-')).join('');
      const alvo = args.find((a) => !a.startsWith('-'));
      if (alvo === 'projetos' || alvo === 'projetos/') return comandos.projetos.run();
      if (alvo === 'servicos' || alvo === 'servicos/') return comandos.servicos.run();
      if (alvo && alvo !== '~' && alvo !== '.') return [<C c="red">ls: não foi possível acessar '{alvo}': Arquivo ou diretório inexistente</C>];
      const todos = flags.includes('a');
      return [
        <>
          {todos && (
            <>
              <C c="cyan">./</C>
              {'  '}
              <C c="cyan">../</C>
              {'  '}
              <C c="dim">.segredo</C>
              {'  '}
            </>
          )}
          <C c="cyan">projetos/</C>
          {'  '}
          <C c="cyan">servicos/</C>
          {'  '}
          {ARQUIVOS.join('  ')}
        </>,
      ];
    },
  },
  ll: { run: () => comandos.ls.run(['-la']) },
  cat: {
    run: (args) => (args.length ? args.flatMap((a) => cat(a)) : [<C c="red">uso: cat &lt;arquivo&gt;</C>]),
  },
  less: { alias: 'cat' },
  abrir: {
    run: (args, ctx) => {
      const alvo = (args[0] || '').toLowerCase();
      const p = projetos.find((x) => x.slug === alvo || x.slug.startsWith(alvo));
      const url = (alvo && p?.url) || REDES[alvo];
      if (!alvo) return [<C c="red">uso: abrir &lt;projeto | github | linkedin | instagram | whatsapp | email&gt;</C>];
      if (!url) return [<C c="red">abrir: não sei abrir "{alvo}". tente `projetos` para ver os nomes.</C>];
      if (p?.tom === 'off' && !REDES[alvo]) {
        return [
          <C c="red">abrir: {p.dominio} está fora do ar no momento.</C>,
          <>
            <C c="muted">o código continua no GitHub:</C> <Link href={p.repo}>{p.repo.replace('https://', '')} ↗</Link>
          </>,
        ];
      }
      ctx.abrir(url);
      return [<C c="muted">abrindo {url.replace(/^https?:\/\//, '').split('?')[0]}…</C>];
    },
  },
  open: { alias: 'abrir' },
  github: { run: (_, ctx) => comandos.abrir.run(['github'], ctx) },
  linkedin: { run: (_, ctx) => comandos.abrir.run(['linkedin'], ctx) },
  instagram: { run: (_, ctx) => comandos.abrir.run(['instagram'], ctx) },
  whatsapp: { run: (_, ctx) => comandos.abrir.run(['whatsapp'], ctx) },
  cd: {
    run: (args, ctx) => {
      const alvo = (args[0] || '~').replace(/\/$/, '');
      if (alvo === '..' || alvo === '/') return [<C c="muted">você já está no topo da carreira. por enquanto. 😎</C>];
      const id = SECOES[alvo];
      if (!id) return [<C c="red">cd: sem esse diretório: {alvo}</C>];
      ctx.irPara(id);
      return [];
    },
  },
  orcamento: {
    run: (_, ctx) => {
      ctx.irPara('contato');
      window.dispatchEvent(new Event('ato:orcamento'));
      return [];
    },
  },
  orçamento: { alias: 'orcamento' },
  contratar: { alias: 'orcamento' },
  hire: { alias: 'orcamento' },
  tema: {
    run: (args, ctx) => {
      if (!args[0]) {
        return [
          ...TEMAS.map((t) => (
            <>
              <C c={t.id === ctx.tema ? 'accent' : 'muted'}>{t.id === ctx.tema ? '◉' : '○'}</C> {t.nome.padEnd(12)}
              <C c="dim">{t.desc}</C>
            </>
          )),
          '',
          <>
            <C c="dim">uso:</C> <C c="accent">tema dracula</C>
          </>,
        ];
      }
      const ok = ctx.setTema(args[0].toLowerCase());
      return ok
        ? [<C c="accent">✔ tema alterado para {args[0].toLowerCase()}</C>]
        : [<C c="red">tema: "{args[0]}" não existe. opções: {TEMAS.map((t) => t.id).join(', ')}</C>];
    },
  },
  theme: { alias: 'tema' },
  pwd: { run: () => [`/home/${USUARIO}`] },
  date: {
    run: () => [
      new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'full',
        timeStyle: 'medium',
        timeZone: 'America/Sao_Paulo',
      }).format(new Date()) + ' (Brasília)',
    ],
  },
  echo: { run: (args) => [args.join(' ')] },
  uname: {
    run: (args) => [args.includes('-a') ? 'ato.js 2.0.26-react19 #1 SMP PREEMPT_DYNAMIC x86_64 Padre-Bernardo/GO GNU/Linux' : 'ato.js'],
  },
  history: { run: (_, ctx) => ctx.historico.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`) },
  clear: { run: () => ({ limpar: true }) },
  cls: { alias: 'clear' },
  exit: {
    run: (_, ctx) => {
      ctx.fechar();
      return [];
    },
  },
  logout: { alias: 'exit' },
  quit: { alias: 'exit' },

  // ---- easter eggs (não aparecem no help) ----
  sudo: {
    oculto: true,
    run: (args, ctx) => {
      const resto = args.join(' ');
      if (/^(contratar|hire|orcamento|orçamento)/.test(resto)) {
        ctx.abrir(zap('Olá Arthur! Rodei sudo contratar no seu site. Bora conversar sobre um projeto?'));
        return [
          <C c="muted">[sudo] senha para {USUARIO}: ********</C>,
          <C c="accent">✔ permissão concedida. abrindo o WhatsApp do Arthur…</C>,
        ];
      }
      if (/^rm\b/.test(resto)) return [<C c="red">nem com sudo. este portfólio tem Row Level Security. 😎</C>];
      if (!resto) return [<C c="red">uso: sudo &lt;comando&gt;</C>];
      return [
        <C c="red">{USUARIO} não está no arquivo sudoers. Este incidente será reportado. 👀</C>,
        <C c="dim">(psiu: tenta `sudo contratar`)</C>,
      ];
    },
  },
  rm: { oculto: true, run: () => [<C c="red">rm: não é possível remover: Permissão negada (boa tentativa)</C>] },
  vim: {
    oculto: true,
    run: () => [
      <C c="yellow">você entrou no vim. ninguém nunca saiu daqui.</C>,
      <C c="dim">(dica: digite :q)</C>,
    ],
  },
  vi: { alias: 'vim' },
  nvim: { alias: 'vim' },
  ':q': { oculto: true, run: () => [<C c="accent">você saiu do vim. isso já pode ir pro currículo.</C>] },
  ':wq': { alias: ':q' },
  ':q!': { alias: ':q' },
  nano: { oculto: true, run: () => ['nano? aqui é terminal de respeito. tenta o vim.'] },
  emacs: { oculto: true, run: () => ['emacs é um ótimo sistema operacional. só falta um bom editor.'] },
  matrix: {
    oculto: true,
    run: () => {
      if (semMovimento()) return [<C c="muted">matrix desligado: seu sistema pediu menos movimento.</C>];
      window.dispatchEvent(new Event('ato:matrix'));
      return [<C c="accent">acorde, Neo… (Esc para sair)</C>];
    },
  },
  cowsay: {
    oculto: true,
    run: (args) => [pre(VACA(args.join(' ') || 'muuu. contrata o Arthur.'))],
  },
  fortune: { oculto: true, run: () => [<C c="yellow">{FRASES[Math.floor(Math.random() * FRASES.length)]}</C>] },
  cafe: { oculto: true, run: () => [pre(CAFE, 'yellow'), 'café passado. produtividade +20%.'] },
  café: { alias: 'cafe' },
  coffee: { alias: 'cafe' },
  ping: {
    oculto: true,
    run: (args) => {
      const host = args[0] || 'ato.js';
      return [
        `PING ${host}: 56 bytes de dados`,
        ...[1, 2, 3, 4].map((i) => `64 bytes de ${host}: icmp_seq=${i} ttl=64 tempo=${(1.4 + Math.random()).toFixed(1)} ms`),
        <C c="accent">--- 0% de perda · é fibra óptica, né ---</C>,
      ];
    },
  },
  git: {
    oculto: true,
    run: (args, ctx) => {
      if (args[0] === 'log') {
        ctx.irPara('atividade');
        return [];
      }
      if (args[0] === 'push') return [<C c="accent">Everything up-to-date ✔ ({projetos.length} projetos no repositório)</C>];
      return [
        'On branch main',
        "Your branch is up to date with 'origin/main'.",
        '',
        'Untracked files:',
        <C c="red">{'        '}seu-proximo-projeto/</C>,
        '',
        <C c="muted">
          use <C c="accent">orcamento</C> para adicioná-lo
        </C>,
      ];
    },
  },
  npm: {
    oculto: true,
    run: (args) =>
      args[0] === 'install' || args[0] === 'i'
        ? [<C c="accent">added 1 desenvolvedor ao seu time em 0.2s</C>, <C c="muted">1 package is looking for funding: run `orcamento`</C>]
        : ['uso: npm install'],
  },
  shikamaru: { oculto: true, run: () => ['que saco… mas tudo bem, eu faço o seu site. 🦌'] },
  oi: { oculto: true, run: () => ['oi! 👋 digita help pra ver o que dá pra fazer aqui.'] },
  ola: { alias: 'oi' },
  olá: { alias: 'oi' },
  hello: { alias: 'oi' },
  sl: { oculto: true, run: () => ['🚂💨  você quis dizer ls? o trem já passou.'] },
  42: { oculto: true, run: () => ['a resposta para a vida, o universo e tudo mais.'] },
};

function resolver(nome) {
  let c = comandos[nome];
  while (c?.alias) c = comandos[c.alias];
  return c;
}

const VISIVEIS = Object.keys(comandos).filter((k) => !comandos[k].oculto && !comandos[k].alias);

function distancia(a, b) {
  const m = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return m[a.length][b.length];
}

export function executar(texto, ctx) {
  const [nome, ...args] = texto.trim().split(/\s+/);
  const cmd = resolver(nome.toLowerCase());
  if (!cmd) {
    const parecido = VISIVEIS.map((v) => [v, distancia(nome.toLowerCase(), v)])
      .filter(([, d]) => d <= 2)
      .sort((a, b) => a[1] - b[1])[0];
    return {
      saida: [
        <C c="red">zsh: comando não encontrado: {nome}</C>,
        parecido ? (
          <C c="muted">
            você quis dizer <C c="accent">{parecido[0]}</C>?
          </C>
        ) : (
          <C c="muted">
            digite <C c="accent">help</C> para ver os comandos.
          </C>
        ),
      ],
    };
  }
  const r = cmd.run(args, ctx);
  return Array.isArray(r) ? { saida: r } : r;
}

// Autocompletar com Tab: comandos, arquivos, projetos, seções e temas.
const ARGUMENTOS = {
  cat: () => [...ARQUIVOS, ...projetos.map((p) => p.slug)],
  less: () => [...ARQUIVOS, ...projetos.map((p) => p.slug)],
  abrir: () => [...projetos.map((p) => p.slug), ...Object.keys(REDES)],
  open: () => [...projetos.map((p) => p.slug), ...Object.keys(REDES)],
  cd: () => Object.keys(SECOES).filter((s) => s !== 'serviços'),
  tema: () => TEMAS.map((t) => t.id),
  theme: () => TEMAS.map((t) => t.id),
  ls: () => ['projetos/', 'servicos/', '-la'],
  sudo: () => ['contratar'],
  git: () => ['status', 'log', 'push'],
};

export function completar(entrada) {
  const partes = entrada.replace(/^\s+/, '').split(/\s+/);
  const primeira = partes.length <= 1;
  const atual = partes[partes.length - 1] || '';
  const lista = primeira ? VISIVEIS : ARGUMENTOS[partes[0].toLowerCase()]?.() || [];
  const opcoes = lista.filter((x) => x.startsWith(atual.toLowerCase()));
  const antes = primeira ? '' : partes.slice(0, -1).join(' ') + ' ';
  if (opcoes.length === 1) return { valor: antes + opcoes[0] + (opcoes[0].endsWith('/') ? '' : ' '), opcoes: [] };
  if (opcoes.length > 1) {
    let comum = opcoes[0];
    for (const o of opcoes) while (!o.startsWith(comum)) comum = comum.slice(0, -1);
    return { valor: antes + (comum.length > atual.length ? comum : atual), opcoes };
  }
  return { valor: entrada, opcoes: [] };
}

export const SUGESTOES = ['help', 'projetos', 'neofetch', 'sobre', 'cat curriculo.txt', 'tema', 'matrix', 'sudo contratar'];
