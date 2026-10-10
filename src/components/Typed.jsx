import { useEffect, useState } from 'react';

const semAnimacao =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Efeito de digitação estilo terminal. O texto completo fica no aria-label
// do elemento pai, então a animação é escondida de leitores de tela.
export default function Typed({ text }) {
  const [n, setN] = useState(semAnimacao ? text.length : 0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), 45);
    return () => clearTimeout(t);
  }, [n, text]);
  return (
    <span aria-hidden="true">
      {text.slice(0, n)}
      <span className="cursor">▋</span>
    </span>
  );
}
