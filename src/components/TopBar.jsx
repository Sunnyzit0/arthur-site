import { useEffect, useRef, useState } from 'react';
import { perfil } from '../data';
import { useAgora } from '../lib/hooks';
import { AREAS } from '../lib/secoes';
import { abrirTerminal, useTerminal } from '../lib/terminal';
import { setTema, TEMAS, useTema } from '../lib/theme';
import { Icone } from './icones';
import './TopBar.css';


const hora = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'America/Sao_Paulo',
});

function MenuTema() {
  const tema = useTema();
  const [aberto, setAberto] = useState(false);
  const raiz = useRef(null);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e) => {
      if (!raiz.current?.contains(e.target)) setAberto(false);
    };
    const esc = (e) => {
      if (e.key === 'Escape') {
        setAberto(false);
        raiz.current?.querySelector('button')?.focus();
      }
    };
    document.addEventListener('pointerdown', fora);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', fora);
      document.removeEventListener('keydown', esc);
    };
  }, [aberto]);

  return (
    <div className="tema" ref={raiz}>
      <button
        className="bar-btn"
        aria-haspopup="menu"
        aria-expanded={aberto}
        aria-label={`Trocar tema (atual: ${tema})`}
        onClick={() => setAberto((a) => !a)}
      >
        {Icone.paleta}
        <span className="bar-label">{tema}</span>
      </button>
      {aberto && (
        <ul className="tema-menu" role="menu" aria-label="Temas">
          {TEMAS.map((t) => (
            <li key={t.id} role="none">
              <button
                role="menuitemradio"
                aria-checked={tema === t.id}
                data-theme={t.id}
                className="tema-item"
                onClick={() => {
                  setTema(t.id);
                  setAberto(false);
                }}
              >
                <span className="tema-amostra" aria-hidden="true">
                  <i style={{ background: 'var(--bg)' }} />
                  <i style={{ background: 'var(--accent)' }} />
                  <i style={{ background: 'var(--accent-2)' }} />
                  <i style={{ background: 'var(--purple)' }} />
                </span>
                <span className="tema-nome">{t.nome}</span>
                <span className="tema-desc">{t.desc}</span>
              </button>
            </li>
          ))}
          <li role="none" className="tema-dica">
            ou digite <code>tema &lt;nome&gt;</code> no terminal
          </li>
        </ul>
      )}
    </div>
  );
}

export default function TopBar({ ativa }) {
  const agora = useAgora();
  const { aberto } = useTerminal();

  return (
    <header className="bar">
      <a href="#inicio" className="bar-logo" aria-label={`${perfil.nome}: início`}>
        <span className="t-accent">~/</span>
        {perfil.handle}
      </a>

      <nav className="areas" aria-label="Seções">
        {AREAS.map((a, i) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            className={`area ${ativa === a.id ? 'ativa' : ''}`}
            aria-current={ativa === a.id ? 'location' : undefined}
            aria-label={a.id === 'inicio' ? 'início' : a.nome}
          >
            <span className="area-n">{i + 1}</span>
            <span className="area-nome">{a.nome}</span>
          </a>
        ))}
      </nav>

      <div className="bar-dir">
        <span className="bar-status">
          <span className="ok-dot" aria-hidden="true" /> disponível
        </span>
        <time className="bar-hora" aria-label="Horário de Brasília">
          {agora ? hora.format(agora) : '--:--'}
        </time>
        <MenuTema />
        <button
          className={`bar-btn bar-term ${aberto ? 'ativo' : ''}`}
          onClick={() => abrirTerminal()}
          aria-label="Abrir terminal"
          title="Abrir terminal ( ` ou : )"
        >
          <span aria-hidden="true">&gt;_</span>
          <span className="bar-label">terminal</span>
        </button>
      </div>
    </header>
  );
}
