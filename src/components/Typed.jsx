import { useEffect, useState } from 'react';

// Efeito de digitação estilo terminal.
export default function Typed({ text }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), 45);
    return () => clearTimeout(t);
  }, [n, text]);
  return (
    <span>
      {text.slice(0, n)}
      <span className="cursor">▋</span>
    </span>
  );
}
