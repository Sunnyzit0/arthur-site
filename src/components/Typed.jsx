import { useEffect, useState } from 'react';
import { aposBoot, semMovimento } from '../lib/hooks';

// Efeito de digitação estilo terminal. O HTML pré-renderizado já traz o texto
// completo (bom para o Google); no navegador ele some e é "digitado" depois do
// boot. O texto real fica no aria-label do elemento pai.
export default function Typed({ text, velocidade = 55 }) {
  const [n, setN] = useState(text.length);
  const [fase, setFase] = useState('ssr');

  useEffect(
    () =>
      aposBoot(() => {
        if (semMovimento()) {
          setFase('pronto');
          return;
        }
        setN(0);
        setFase('digitando');
      }),
    [],
  );

  useEffect(() => {
    if (fase !== 'digitando' || n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), velocidade + Math.random() * 45);
    return () => clearTimeout(t);
  }, [n, fase, text, velocidade]);

  const estado = fase === 'digitando' && n >= text.length ? 'pronto' : fase;

  return (
    <span className="typed" data-fase={estado} aria-hidden="true">
      <span className="typed-text">{text.slice(0, n)}</span>
      <span className="cursor" />
    </span>
  );
}
