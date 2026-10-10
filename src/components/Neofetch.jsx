import { perfil, projetos } from '../data';
import { useAgora } from '../lib/hooks';
import AsciiLogo from './AsciiLogo';
import './Neofetch.css';

const DIA = 86_400_000;

function uptime(agora) {
  if (!agora) return '…';
  const inicio = new Date(`${perfil.desde}T00:00:00-03:00`);
  const dias = Math.max(0, Math.floor((agora - inicio) / DIA));
  return `${dias} dias (desde o 1º repo)`;
}

export default function Neofetch({ compacto = false }) {
  const agora = useAgora(60_000);
  const linhas = [
    ['OS', 'ato.js 2026 x86_64'],
    ['Host', 'dev web freelancer'],
    ['Kernel', 'React 19 · TypeScript'],
    ['Uptime', uptime(agora)],
    ['Packages', `${projetos.length} projetos (${projetos.filter((p) => p.tom === 'live').length} em produção)`],
    ['Shell', 'zsh + Claude Code'],
    ['Stack', 'Vite · Tailwind · Supabase'],
    ['Rede', 'fibra óptica (é sério)'],
    ['Local', perfil.local],
    ['Status', 'freelas e estágio'],
  ];

  return (
    <div className={`neo ${compacto ? 'compacto' : ''}`}>
      <AsciiLogo className="neo-logo" />
      <div className="neo-info">
        <p className="neo-titulo">
          <span className="t-accent t-bold">{perfil.usuario}</span>
          <span className="t-muted">@</span>
          <span className="t-accent t-bold">{perfil.handle}</span>
        </p>
        <p className="neo-sep" aria-hidden="true">
          {'-'.repeat(perfil.usuario.length + perfil.handle.length + 1)}
        </p>
        <dl>
          {linhas.map(([k, v]) => (
            <div key={k} className="neo-linha">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="neo-cores" aria-hidden="true">
          {['bg-3', 'red', 'accent', 'yellow', 'accent-2', 'purple', 'muted', 'text'].map((c) => (
            <span key={c} className="swatch" style={{ background: `var(--${c})` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
