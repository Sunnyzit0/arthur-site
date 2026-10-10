// Edite aqui seus dados — o site inteiro (e o terminal) lê deste arquivo.

export const perfil = {
  nome: 'Arthur da Costa Silva',
  usuario: 'arthur',
  host: 'ato',
  handle: 'ato.js',
  cargo: 'Desenvolvedor Web',
  local: 'Padre Bernardo, GO',
  alcance: 'atendo todo o Brasil',
  status: 'aberto a freelas e estágio',
  headline: 'Crio sites e sistemas web para negócios locais, do layout ao deploy.',
  resumo:
    'Sites rápidos, seguros e que o dono consegue atualizar sozinho. Quatro projetos no ar: um sistema de reservas, uma loja, um site de clínica e um portfólio.',
  // Só dígitos: DDI 55 + DDD + número
  whatsapp: '5561999170651',
  telefone: '(61) 9 9917-0651',
  email: 'arthurgapb@gmail.com',
  githubUser: 'Sunnyzit0',
  github: 'https://github.com/Sunnyzit0',
  instagram: 'https://instagram.com/ato.js',
  linkedin: 'https://www.linkedin.com/in/arthuzinho/',
  // Data do primeiro repositório no GitHub (usada no "Uptime" do neofetch)
  desde: '2026-03-10',
};

export const sobre = [
  'Oi! Sou o Arthur. Estudo Engenharia de Software na UCB e crio sites e sistemas web para negócios locais: do primeiro rascunho até o domínio funcionando.',
  'Antes do código vieram os cabos. Trabalho com instalação e manutenção de redes de fibra óptica na NowNet e passei três anos no Fórum do TJGO com suporte de TI e atendimento ao público. Foi ali que aprendi a ouvir o cliente, resolver o problema de verdade e entregar no prazo.',
  'Hoje junto as duas coisas: entendo de rede, de servidor e de gente. Por isso entrego site que abre rápido, aparece no Google e que o dono consegue atualizar sem depender de mim.',
];

export const projetos = [
  {
    slug: 'recanto',
    nome: 'Recanto da Piscina',
    tipo: 'Sistema de reservas',
    status: 'em produção',
    tom: 'live',
    url: 'https://www.recantodapiscina.com.br',
    dominio: 'recantodapiscina.com.br',
    repo: 'https://github.com/Sunnyzit0/recanto-booking-bliss',
    imagem: '/projetos/recanto.webp',
    descricao:
      'Espaço de eventos com piscina em Padre Bernardo. O cliente vê as datas livres em tempo real, pede até 3 datas e o dono aprova ou recusa pelo painel, com aviso automático por e-mail.',
    destaques: [
      ['Calendário ao vivo: disponível, em análise e reservado', 'Postgres expõe só as datas, nunca os dados'],
      ['Painel do dono com login seguro', 'sessão HMAC + trava contra força bruta'],
      ['Aviso por e-mail a cada pedido', 'Resend + domínio verificado'],
      ['Dados dos clientes protegidos', 'Row Level Security + server functions'],
      ['Galeria e textos editáveis pelo próprio dono', null],
    ],
    stack: ['TanStack Start', 'TypeScript', 'Supabase', 'Tailwind', 'Resend', 'Vercel'],
  },
  {
    slug: 'vk-store',
    nome: 'VK Store',
    tipo: 'Loja e assistência técnica',
    status: 'no ar',
    tom: 'live',
    url: 'https://vk-store-two.vercel.app',
    dominio: 'vk-store-two.vercel.app',
    repo: 'https://github.com/Sunnyzit0/vk-store',
    imagem: '/projetos/vk-store.webp',
    descricao:
      'Celulares, acessórios e conserto em Padre Bernardo. Site 2.0 que abre instantâneo, com catálogo, horários e contato num único arquivo de conteúdo.',
    destaques: [
      ['Abre rápido e aparece no Google', 'HTML pré-renderizado no build'],
      ['Fotos leves sem perder qualidade', 'AVIF/WebP responsivo com sharp'],
      ['Animações suaves', 'Motion'],
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind v4', 'Motion'],
  },
  {
    slug: 'jaquefisio',
    nome: 'Jaqueline Lima',
    tipo: 'Fisioterapia e quiropraxia',
    status: 'no ar',
    tom: 'live',
    url: 'https://jaquefisio.vercel.app',
    dominio: 'jaquefisio.vercel.app',
    repo: 'https://github.com/Sunnyzit0/jaquefisio',
    imagem: '/projetos/jaquefisio.webp',
    descricao:
      'Fisioterapeuta que atende em domicílio. Pensado para pacientes idosos: letras grandes, bom contraste e navegação simples.',
    destaques: [
      ['Uma página para cada um dos 8 serviços', 'React Router + SEO por página'],
      ['Agendamento e avaliação pelo WhatsApp', null],
      ['Prévia bonita ao compartilhar o link', 'Open Graph, sitemap e robots'],
    ],
    stack: ['React', 'Vite', 'React Router', 'Tailwind'],
  },
  {
    slug: 'jhennyfer',
    nome: 'Jhennyfer Videomaker',
    tipo: 'Portfólio de videomaker',
    status: 'protótipo',
    tom: 'proto',
    url: 'https://jhennyfer-videomaker.vercel.app',
    dominio: 'jhennyfer-videomaker.vercel.app',
    repo: 'https://github.com/Sunnyzit0/jhennyfer-videomaker',
    imagem: '/projetos/jhennyfer.webp',
    descricao:
      'Identidade de "sala escura": grão de filme, visor de câmera no topo e vermelho REC. Abertura 3-2-1 e animações que acompanham a rolagem.',
    destaques: [
      ['Animações guiadas pela rolagem', 'scroll-driven animations'],
      ['Preços, fotos e vídeos editáveis', 'dados em src/data/'],
      ['Respeita "reduzir movimento"', 'prefers-reduced-motion'],
    ],
    stack: ['React', 'Vite', 'CSS puro', 'Playwright', 'sharp'],
  },
];

export const servicos = [
  {
    pacote: 'site-institucional',
    titulo: 'Site institucional',
    texto: 'Seu negócio aparecendo no Google, com WhatsApp a um toque e endereço no mapa.',
    inclui: ['domínio .com.br', 'SEO', 'botão de WhatsApp', 'mapa e horários'],
  },
  {
    pacote: 'portfolio',
    titulo: 'Portfólio',
    texto: 'Vitrine pro seu trabalho: fotógrafos, videomakers e profissionais autônomos.',
    inclui: ['galeria otimizada', 'tabela de preços', 'contato direto', 'visual próprio'],
  },
  {
    pacote: 'sistema-sob-medida',
    titulo: 'Sistema sob medida',
    texto: 'Reservas, agendamentos e um painel pra você gerenciar tudo sem planilha.',
    inclui: ['painel admin', 'banco de dados', 'login seguro', 'e-mails automáticos'],
  },
  {
    pacote: 'dominio-hospedagem',
    titulo: 'Domínio e hospedagem',
    texto: 'Configuro domínio, hospedagem e e-mail e entrego funcionando. Você só divulga o link.',
    inclui: ['registro.br', 'hospedagem Vercel', 'cadeado HTTPS', 'e-mail'],
  },
];

export const processo = [
  { hash: 'a1c0de5', titulo: 'conversa', texto: 'Entendo o seu negócio, o público e o que o site precisa resolver.' },
  { hash: 'b4d9e7f', titulo: 'proposta', texto: 'Escopo, prazo e orçamento combinados antes de começar.' },
  { hash: 'c0ffee1', titulo: 'protótipo', texto: 'Você acompanha o site num link de teste e pede ajustes.' },
  { hash: 'd3c0ded', titulo: 'deploy', texto: 'Domínio, Google e HTTPS configurados. Site no ar.' },
  { hash: '5afe5ed', titulo: 'suporte', texto: 'Ajustes e atualizações quando você precisar.' },
];

export const skills = {
  'front-end': ['TypeScript', 'JavaScript', 'React', 'Vite', 'Tailwind CSS', 'HTML', 'CSS'],
  'back-end': ['Supabase', 'PostgreSQL', 'Server functions', 'Zod', 'Resend'],
  deploy: ['Vercel', 'Git & GitHub', 'GitHub Actions', 'Domínios'],
  ferramentas: ['Claude Code', 'VS Code', 'Playwright', 'Notion'],
  hardware: ['Fibra óptica', 'Redes', 'Manutenção de PCs'],
};

export const trajetoria = [
  {
    quando: '2026 — hoje',
    titulo: 'Desenvolvedor Web freelancer',
    onde: 'Autônomo · Padre Bernardo, GO',
    tipo: 'freela',
    texto: '4 sites entregues para negócios locais: sistema de reservas, loja, clínica e portfólio.',
  },
  {
    quando: '2026 — hoje',
    titulo: 'Auxiliar Técnico em Telecomunicações',
    onde: 'NowNet Telecomunicações',
    tipo: 'trabalho',
    texto: 'Instalação, manutenção e reparo de redes de fibra óptica e configuração de equipamentos de conexão para clientes.',
  },
  {
    quando: '2026 — cursando',
    titulo: 'Engenharia de Software',
    onde: 'Universidade Católica de Brasília (UCB)',
    tipo: 'estudo',
    texto: 'Graduação EaD.',
  },
  {
    quando: '2023 — 2026',
    titulo: 'Estagiário',
    onde: 'Fórum TJGO',
    tipo: 'trabalho',
    texto: 'Suporte em TI, atendimento ao público, organização de arquivos físicos e digitais, rotinas de RH e controle de planilhas.',
  },
  {
    quando: '2024 — 2026',
    titulo: 'Jovem Aprendiz',
    onde: 'DEMÁ / RENAPSI',
    tipo: 'estudo',
    texto: 'Formação em Administração: auxiliar administrativo, arquivista e almoxarife.',
  },
];

export const cursos = [
  { nome: 'HTML, CSS e JavaScript', onde: 'Fundação Bradesco', ano: '2024' },
  { nome: 'Lógica de Programação', onde: 'Instituto Univep', ano: '2024' },
  { nome: 'Manutenção de Computadores', onde: 'Instituto Univep', ano: '2024' },
  { nome: 'Inglês B1 (leitura)', onde: 'EF Education First', ano: '2025' },
  { nome: 'Mídias Sociais Avançado', onde: 'Instituto Univep', ano: '2025' },
  { nome: 'Ensino Médio', onde: 'CEPMG', ano: '2025' },
];

// Repositórios mostrados em "atividade ao vivo" (commits puxados da API do GitHub)
export const reposAtividade = [
  'arthur-site',
  'recanto-booking-bliss',
  'vk-store',
  'jaquefisio',
  'jhennyfer-videomaker',
];
