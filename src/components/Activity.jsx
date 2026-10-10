import { useEffect, useRef, useState } from 'react';
import { perfil } from '../data';
import { ultimosCommits } from '../lib/github';
import { tempoRelativo, useAgora } from '../lib/hooks';
import { SectionHead, Window } from './ui';
import './Activity.css';

const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

function Carregando() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % SPINNER.length), 80);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="git-status">
      <span className="t-accent">{SPINNER[i]}</span> buscando commits em github.com/{perfil.githubUser}…
    </p>
  );
}

export default function Activity() {
  const [estado, setEstado] = useState({ fase: 'ocioso' });
  const raiz = useRef(null);
  const agora = useAgora(60_000);

  // Só chama a API quando a seção chega perto da tela
  useEffect(() => {
    const el = raiz.current;
    let vivo = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        setEstado({ fase: 'carregando' });
        ultimosCommits()
          .then((commits) => vivo && setEstado({ fase: 'ok', commits }))
          .catch((err) => vivo && setEstado({ fase: 'erro', msg: err.message }));
      },
      { rootMargin: '300px' },
    );
    obs.observe(el);
    return () => {
      vivo = false;
      obs.disconnect();
    };
  }, []);

  return (
    <section id="atividade" aria-labelledby="t-atividade" ref={raiz}>
      <div className="wrap">
        <SectionHead
          id="t-atividade"
          num="04."
          path="~/github"
          cmd="git log --all --oneline -8"
          title="atividade"
          lead="Commits reais, puxados ao vivo da API do GitHub agora mesmo."
        />
        <Window
          title={`zsh — github.com/${perfil.githubUser}`}
          extra={estado.fase === 'ok' ? 'ao vivo' : ''}
          className="git-win reveal"
          bodyClass="git-body"
        >
          <div aria-live="polite" aria-busy={estado.fase === 'carregando'}>
            {(estado.fase === 'ocioso' || estado.fase === 'carregando') && <Carregando />}

            {estado.fase === 'erro' && (
              <p className="git-status">
                <span className="t-red">fatal:</span> não consegui falar com o GitHub ({estado.msg}).{' '}
                <a className="t-accent" href={perfil.github} target="_blank" rel="noreferrer">
                  veja direto no meu perfil ↗
                </a>
              </p>
            )}

            {estado.fase === 'ok' && (
              <ol className="git-lista">
                {estado.commits.map((c) => (
                  <li key={c.repo + c.sha}>
                    <a href={c.url} target="_blank" rel="noreferrer" className="git-linha">
                      <span className="git-grafo" aria-hidden="true">
                        *
                      </span>
                      <span className="git-sha">{c.sha}</span>
                      <span className="git-repo">({c.repo})</span>
                      <span className="git-msg">{c.msg}</span>
                      <span className="git-quando">{agora && c.data ? tempoRelativo(new Date(c.data), agora) : ''}</span>
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </Window>
        <p className="git-rodape">
          <a href={perfil.github} target="_blank" rel="noreferrer">
            ver todos os repositórios em github.com/{perfil.githubUser} ↗
          </a>
        </p>
      </div>
    </section>
  );
}
