import { useRolagem } from '../lib/hooks';
import { useTerminal } from '../lib/terminal';
import './StatusLine.css';

const ARQUIVO = {
  inicio: 'README.md',
  projetos: 'projetos/',
  servicos: 'servicos.md',
  sobre: 'sobre.md',
  atividade: 'git.log',
  contato: 'orcamento.sh',
};

// Statusline do vim no rodapé (só em telas largas).
export default function StatusLine({ ativa }) {
  const pos = useRolagem();
  const { aberto } = useTerminal();

  return (
    <div className="vim" aria-hidden="true">
      <span className={`vim-modo ${aberto ? 'modo-term' : ''}`}>{aberto ? 'TERMINAL' : 'NORMAL'}</span>
      <span className="vim-branch">git:(main)</span>
      <span className="vim-arquivo">~/ato.js/{ARQUIVO[ativa] ?? 'README.md'}</span>
      <span className="vim-dica">
        <kbd>:</kbd> abre o terminal
      </span>
      <span className="vim-info">utf-8 · jsx</span>
      <span className="vim-pos">{pos}</span>
    </div>
  );
}
