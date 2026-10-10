import { useSyncExternalStore } from 'react';

// Estado global do terminal: aberto/fechado e um comando para rodar ao abrir.
let estado = { aberto: false, pendente: null };
const ouvintes = new Set();

function mudar(novo) {
  estado = { ...estado, ...novo };
  ouvintes.forEach((f) => f());
}

export const abrirTerminal = (comando = null) => mudar({ aberto: true, pendente: comando });
export const fecharTerminal = () => mudar({ aberto: false, pendente: null });
export const alternarTerminal = () => (estado.aberto ? fecharTerminal() : abrirTerminal());
export const consumirPendente = () => {
  const c = estado.pendente;
  if (c) estado = { ...estado, pendente: null };
  return c;
};

const assinar = (f) => {
  ouvintes.add(f);
  return () => ouvintes.delete(f);
};
const servidor = { aberto: false, pendente: null };

export const useTerminal = () => useSyncExternalStore(assinar, () => estado, () => servidor);
