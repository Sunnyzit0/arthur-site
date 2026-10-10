import { useEffect, useState } from 'react';

export const semMovimento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Roda `cb` quando a animação de boot terminar (ou na hora, se não houve boot).
export function aposBoot(cb) {
  if (!document.documentElement.classList.contains('booting')) {
    cb();
    return () => {};
  }
  window.addEventListener('ato:booted', cb, { once: true });
  return () => window.removeEventListener('ato:booted', cb);
}

// Data atual só no navegador: no HTML pré-renderizado fica null, evitando
// diferença entre servidor e cliente na hidratação.
export function useAgora(intervalo = 15_000) {
  const [agora, setAgora] = useState(null);
  useEffect(() => {
    const tick = () => setAgora(new Date());
    tick();
    const id = setInterval(tick, intervalo);
    return () => clearInterval(id);
  }, [intervalo]);
  return agora;
}

// Seção que está no meio da tela (para a barra superior e a statusline).
export function useSecaoAtiva(ids) {
  const [ativa, setAtiva] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtiva(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return ativa;
}

// Porcentagem rolada, no formato do vim: Top, 42%, Bot.
export function useRolagem() {
  const [pos, setPos] = useState('Top');
  useEffect(() => {
    let frame = 0;
    const calc = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setPos(p < 0.02 ? 'Top' : p > 0.98 ? 'Bot' : `${Math.round(p * 100)}%`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return pos;
}

// Revela elementos `.reveal` quando entram na tela. A classe `reveal-on` só é
// ligada depois que o React monta, então sem JS tudo aparece normalmente.
export function useReveal() {
  useEffect(() => {
    const raiz = document.documentElement;
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    raiz.classList.add('reveal-on');
    return () => obs.disconnect();
  }, []);
}

export function tempoRelativo(data, agora = new Date()) {
  const s = Math.max(0, (agora - data) / 1000);
  const tabela = [
    [60, 'segundo', 1],
    [3600, 'minuto', 60],
    [86400, 'hora', 3600],
    [2592000, 'dia', 86400],
    [31536000, 'mês', 2592000],
    [Infinity, 'ano', 31536000],
  ];
  for (const [limite, nome, div] of tabela) {
    if (s < limite) {
      const n = Math.max(1, Math.floor(s / div));
      if (nome === 'segundo') return 'agora mesmo';
      const plural = nome === 'mês' ? (n > 1 ? 'meses' : 'mês') : nome + (n > 1 ? 's' : '');
      return `há ${n} ${plural}`;
    }
  }
  return '';
}
