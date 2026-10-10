import { perfil } from '../data';
import { abrirTerminal } from '../lib/terminal';
import './Footer.css';

/* global __ANO__ */
// __ANO__ vem do vite.config (ano do build), igual no HTML pré-renderizado e no navegador.
export default function Footer() {
  return (
    <footer className="rodape">
      <div className="wrap rodape-in">
        <p className="rodape-exit">
          <span className="t-dim">[</span>processo concluído com código <span className="t-accent">0</span>
          <span className="t-dim">]</span>
        </p>
        <p>
          © {__ANO__} {perfil.nome} · feito à mão com React + Vite ·{' '}
          <a href="https://github.com/Sunnyzit0/arthur-site" target="_blank" rel="noreferrer">
            código-fonte ↗
          </a>
        </p>
        <p className="rodape-dica">
          psiu: abra o{' '}
          <button type="button" onClick={() => abrirTerminal()}>
            terminal
          </button>{' '}
          e tente <code>sudo contratar</code>
        </p>
      </div>
    </footer>
  );
}
