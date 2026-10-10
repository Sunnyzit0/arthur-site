import { abrirTerminal } from '../lib/terminal';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="wrap rodape-in">
        <p className="rodape-exit">
          <span className="t-dim">[</span>processo concluído com código <span className="t-accent">0</span>
          <span className="t-dim">]</span>
        </p>
        <p>
          feito à mão com React + Vite ·{' '}
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
