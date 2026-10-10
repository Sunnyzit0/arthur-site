import { useId } from 'react';

// Logo "ATO" na fonte ANSI Shadow, desenhado em SVG a partir do texto.
// Desenhar evita depender de uma fonte com caracteres de caixa (█ ╔ ═),
// que ficariam desalinhados com a fonte reserva em alguns aparelhos.
const ARTE = [
  ' █████╗ ████████╗ ██████╗ ',
  '██╔══██╗╚══██╔══╝██╔═══██╗',
  '███████║   ██║   ██║   ██║',
  '██╔══██║   ██║   ██║   ██║',
  '██║  ██║   ██║   ╚██████╔╝',
  '╚═╝  ╚═╝   ╚═╝    ╚═════╝ ',
];

const W = 12;
const H = 20;

function tracos(ch, x, y) {
  const x1 = x + W * 0.35;
  const x2 = x + W * 0.65;
  const y1 = y + H * 0.38;
  const y2 = y + H * 0.62;
  const r = x + W;
  const b = y + H;
  switch (ch) {
    case '═':
      return `M${x} ${y1}H${r}M${x} ${y2}H${r}`;
    case '║':
      return `M${x1} ${y}V${b}M${x2} ${y}V${b}`;
    case '╔':
      return `M${r} ${y1}H${x1}V${b}M${r} ${y2}H${x2}V${b}`;
    case '╗':
      return `M${x} ${y1}H${x2}V${b}M${x} ${y2}H${x1}V${b}`;
    case '╚':
      return `M${x1} ${y}V${y2}H${r}M${x2} ${y}V${y1}H${r}`;
    case '╝':
      return `M${x2} ${y}V${y2}H${x}M${x1} ${y}V${y1}H${x}`;
    default:
      return '';
  }
}

const blocos = [];
let caminho = '';
ARTE.forEach((linha, row) => {
  [...linha].forEach((ch, col) => {
    const x = col * W;
    const y = row * H;
    if (ch === '█') blocos.push([x, y]);
    else caminho += tracos(ch, x, y);
  });
});

const LARGURA = ARTE[0].length * W;
const ALTURA = ARTE.length * H;

export default function AsciiLogo({ className = '' }) {
  const id = useId();
  return (
    <svg
      className={className}
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      role="img"
      aria-label="ato"
      preserveAspectRatio="xMinYMin meet"
    >
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.1" style={{ stopColor: 'var(--accent)' }} />
          <stop offset="0.9" style={{ stopColor: 'var(--accent-2)' }} />
        </linearGradient>
      </defs>
      <g fill={`url(#g${id})`}>
        {blocos.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={W + 0.4} height={H + 0.4} />
        ))}
      </g>
      <path d={caminho} fill="none" stroke={`url(#g${id})`} strokeWidth="1.6" opacity="0.75" />
    </svg>
  );
}
