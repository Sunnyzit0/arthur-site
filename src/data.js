// Edite aqui seus dados — o site inteiro lê deste arquivo.
export const perfil = {
  nome: 'Arthur da Costa Silva',
  handle: 'ato.js',
  cargo: 'Desenvolvedor Web',
  local: 'Padre Bernardo, GO · atendo todo o Brasil',
  bio: 'Estudante de Engenharia de Software na UCB, criando sites rápidos e modernos para pequenos negócios. Do layout ao deploy, com domínio próprio, painel admin e banco de dados quando o projeto pede.',
  // TODO: troque pelo seu número (só dígitos, com DDI 55 + DDD)
  whatsapp: '5561999999999',
  github: 'https://github.com/Sunnyzit0',
  instagram: 'https://instagram.com/ato.js',
  // TODO: coloque seu e-mail de contato
  email: 'seuemail@exemplo.com',
};

export const projetos = [
  {
    nome: 'Recanto da Piscina',
    tipo: 'Sistema de reservas · em produção',
    descricao:
      'Site de reservas para espaço de eventos com calendário em tempo real, pedidos de até 3 datas, painel admin com aprovação por e-mail, galeria e conteúdo editáveis pelo dono.',
    destaques: [
      'Login admin com sessão HMAC e trava contra força bruta',
      'E-mails automáticos com Resend + domínio verificado',
      'SEO completo, dark mode e domínio próprio',
    ],
    stack: ['React', 'TanStack Start', 'Supabase', 'Vercel', 'Resend'],
    link: 'https://www.recantodapiscina.com.br',
  },
  {
    nome: 'Jhennyfer Videomaker',
    tipo: 'Portfólio · protótipo',
    descricao:
      'Portfólio para videomaker apresentar trabalhos, serviços e tabela de preços, com contato direto por WhatsApp e Instagram.',
    destaques: [
      'Layout focado em vídeo e mobile first',
      'Tabela de preços configurável',
      'Deploy contínuo a cada commit',
    ],
    stack: ['React', 'Vite', 'Vercel'],
    link: 'https://jhennyfer-videomaker.vercel.app',
  },
];

export const servicos = [
  { titulo: 'Site institucional', texto: 'Presença profissional pro seu negócio, com WhatsApp, mapa e SEO pra aparecer no Google.' },
  { titulo: 'Portfólio', texto: 'Vitrine pro seu trabalho — ideal pra fotógrafos, videomakers e profissionais autônomos.' },
  { titulo: 'Sistema sob medida', texto: 'Reservas, agendamentos e painel admin com banco de dados e login seguro.' },
  { titulo: 'Domínio e hospedagem', texto: 'Configuro domínio .com.br, hospedagem e e-mail. Você só divulga o link.' },
];

export const skills = {
  'Front-end': ['JavaScript', 'React', 'Vite', 'HTML', 'CSS'],
  'Back-end & dados': ['Supabase', 'PostgreSQL', 'Server functions', 'Zod'],
  'Ferramentas': ['Git & GitHub', 'Vercel', 'VS Code', 'Notion'],
};

export const formacao = [
  { titulo: 'Engenharia de Software', local: 'Universidade Católica de Brasília (EaD)', periodo: 'Em andamento' },
];
