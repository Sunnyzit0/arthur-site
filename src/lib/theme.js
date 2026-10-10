import { useSyncExternalStore } from 'react';

export const TEMAS = [
  { id: 'ato', nome: 'ato', desc: 'padrão' },
  { id: 'dracula', nome: 'dracula', desc: 'roxo noturno' },
  { id: 'gruvbox', nome: 'gruvbox', desc: 'retrô quente' },
  { id: 'catppuccin', nome: 'catppuccin', desc: 'mocha pastel' },
  { id: 'amber', nome: 'amber', desc: 'monitor CRT de 1985' },
  { id: 'light', nome: 'light', desc: 'pra quem programa no sol' },
];

const ouvintes = new Set();

const atual = () => document.documentElement.dataset.theme || 'ato';

export function setTema(id) {
  if (!TEMAS.some((t) => t.id === id)) return false;
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem('ato:theme', id);
  } catch {
    // modo anônimo: o tema vale só nesta visita
  }
  // A barra do navegador no celular acompanha o fundo do tema
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
  ouvintes.forEach((f) => f());
  return true;
}

const assinar = (f) => {
  ouvintes.add(f);
  return () => ouvintes.delete(f);
};

export const useTema = () => useSyncExternalStore(assinar, atual, () => 'ato');
