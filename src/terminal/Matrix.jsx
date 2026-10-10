import { useEffect, useRef, useState } from 'react';

const CARACTERES = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789ATOJS<>/{}=;'.split('');
const SEQUENCIA = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Chuva do Matrix: comando `matrix` no terminal ou código Konami na página.
export default function Matrix() {
  const [ativo, setAtivo] = useState(false);
  const canvas = useRef(null);

  useEffect(() => {
    const ligar = () => setAtivo(true);
    const digitado = [];
    const konami = (e) => {
      digitado.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
      if (digitado.length > SEQUENCIA.length) digitado.shift();
      if (SEQUENCIA.every((k, i) => digitado[i] === k)) {
        digitado.length = 0;
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) ligar();
      }
    };
    window.addEventListener('ato:matrix', ligar);
    window.addEventListener('keydown', konami);
    return () => {
      window.removeEventListener('ato:matrix', ligar);
      window.removeEventListener('keydown', konami);
    };
  }, []);

  useEffect(() => {
    if (!ativo) return;
    const cv = canvas.current;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const tam = 16;
    let colunas = [];

    const medir = () => {
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      colunas = Array.from({ length: Math.ceil(window.innerWidth / tam) }, () => Math.random() * -60);
    };
    medir();

    const cor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4ade80';
    let frame;
    let ultimo = 0;
    const desenhar = (t) => {
      frame = requestAnimationFrame(desenhar);
      if (t - ultimo < 50) return;
      ultimo = t;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.09)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${tam}px ui-monospace, monospace`;
      colunas.forEach((y, i) => {
        const ch = CARACTERES[(Math.random() * CARACTERES.length) | 0];
        ctx.fillStyle = Math.random() > 0.96 ? '#fff' : cor;
        ctx.fillText(ch, i * tam, y * tam);
        colunas[i] = y * tam > window.innerHeight && Math.random() > 0.97 ? 0 : y + 1;
      });
    };
    frame = requestAnimationFrame(desenhar);

    const parar = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape') return;
      e.stopPropagation();
      setAtivo(false);
    };
    const fim = setTimeout(() => setAtivo(false), 9000);
    window.addEventListener('resize', medir);
    window.addEventListener('keydown', parar, true);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fim);
      window.removeEventListener('resize', medir);
      window.removeEventListener('keydown', parar, true);
    };
  }, [ativo]);

  if (!ativo) return null;
  return <canvas ref={canvas} className="matrix" aria-hidden="true" onClick={() => setAtivo(false)} />;
}
