import { perfil } from '../data';
import { abrirTerminal } from '../lib/terminal';
import { zap } from '../lib/whatsapp';
import Neofetch from './Neofetch';
import Typed from './Typed';
import { Window } from './ui';
import './Hero.css';

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-nome">
      <div className="wrap hero-grid">
        <div className="hero-texto">
          <p className="hero-status">
            <span className="ok-dot" aria-hidden="true" /> {perfil.status}
          </p>
          <p className="prompt" aria-hidden="true">
            <span className="ps1-user">
              {perfil.usuario}@{perfil.host}
            </span>
            :<span className="ps1-path">~</span>$ whoami
          </p>
          <h1 id="hero-nome" aria-label={perfil.nome}>
            <Typed text={perfil.nome} />
          </h1>
          <p className="role">
            <span className="t-accent">&gt;</span> {perfil.cargo} · {perfil.local}
            <span className="t-muted"> · {perfil.alcance}</span>
          </p>
          <p className="headline">{perfil.headline}</p>
          <p className="resumo">{perfil.resumo}</p>
          <div className="ctas">
            <a
              className="btn primary"
              href={zap('Olá Arthur! Vi seu portfólio e quero um orçamento de site.')}
              target="_blank"
              rel="noreferrer"
            >
              pedir orçamento <span aria-hidden="true">→</span>
            </a>
            <a className="btn" href="#projetos">
              ver projetos
            </a>
            <button className="btn hero-term" onClick={() => abrirTerminal('help')}>
              <span className="t-accent" aria-hidden="true">
                &gt;_
              </span>{' '}
              abrir terminal
            </button>
          </div>
          <p className="hero-dica">
            dica: aperte <kbd>:</kbd> ou <kbd>Ctrl</kbd>+<kbd>K</kbd> em qualquer lugar da página
          </p>
        </div>

        <Window
          className="hero-neo reveal"
          title={`${perfil.usuario}@${perfil.host}: ~ — neofetch`}
          extra="zsh"
        >
          <p className="prompt" aria-hidden="true">
            <span className="ps1-user">
              {perfil.usuario}@{perfil.host}
            </span>
            :<span className="ps1-path">~</span>$ neofetch
          </p>
          <Neofetch />
        </Window>
      </div>
      <a href="#projetos" className="hero-seta" aria-label="Rolar para os projetos">
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
