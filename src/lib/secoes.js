// Seções da página, na ordem: viram as áreas de trabalho da barra superior.
export const AREAS = [
  { id: 'inicio', nome: '~' },
  { id: 'projetos', nome: 'projetos' },
  { id: 'servicos', nome: 'serviços' },
  { id: 'sobre', nome: 'sobre' },
  { id: 'atividade', nome: 'git log' },
  { id: 'contato', nome: 'contato' },
];

export const IDS = AREAS.map((a) => a.id);
