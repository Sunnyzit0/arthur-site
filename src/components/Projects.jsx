import { projetos } from '../data';
import { Icone } from './icones';
import { SectionHead } from './ui';
import './Projects.css';

function Projeto({ p, i }) {
  const principal = i === 0;
  const noAr = p.tom !== 'off';
  // Fora do ar: o print continua (vem do build local), mas sem link para o site
  const Moldura = noAr ? 'a' : 'div';
  const link = noAr ? { href: p.url, target: '_blank', rel: 'noreferrer', tabIndex: -1 } : {};
  return (
    <article
      className={`proj reveal ${principal ? 'principal' : ''} ${noAr ? '' : 'off'}`}
      style={{ '--d': principal ? '0s' : `${(i - 1) * 90}ms` }}
      aria-labelledby={`proj-${p.slug}`}
    >
      <Moldura className="shot" aria-hidden="true" {...link}>
        <span className="shot-bar">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span className="shot-url">
            {Icone.cadeado}
            {p.dominio}
          </span>
        </span>
        <span className="shot-view">
          <img src={p.imagem} alt="" loading="lazy" decoding="async" width="960" height="600" />
          {principal && noAr && <span className="shot-hint">passe o mouse para rolar ↓</span>}
          {!noAr && <span className="shot-off">site fora do ar no momento</span>}
        </span>
      </Moldura>

      <div className="proj-info">
        <p className="proj-meta">
          <span className={`badge ${p.tom}`}>{p.status}</span>
          <span className="proj-tipo">{p.tipo}</span>
        </p>
        <h3 id={`proj-${p.slug}`}>{p.nome}</h3>
        <p className="proj-desc">{p.descricao}</p>
        <ul className="proj-lista">
          {p.destaques.map(([txt, tec]) => (
            <li key={txt}>
              {txt}
              {tec && <span className="tec"> // {tec}</span>}
            </li>
          ))}
        </ul>
        <ul className="tags" aria-label="Tecnologias">
          {p.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <p className="proj-links">
          {noAr ? (
            <a href={p.url} target="_blank" rel="noreferrer">
              abrir site <span aria-hidden="true">↗</span>
              <span className="sr-only"> {p.nome} (abre em nova aba)</span>
            </a>
          ) : (
            <span className="proj-off">site fora do ar</span>
          )}
          <a href={p.repo} target="_blank" rel="noreferrer">
            código <span aria-hidden="true">↗</span>
            <span className="sr-only"> de {p.nome} no GitHub</span>
          </a>
        </p>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projetos" aria-labelledby="t-projetos">
      <div className="wrap">
        <SectionHead
          id="t-projetos"
          num="01."
          path="~/projetos"
          cmd="ls -la --sort=impacto"
          title="projetos"
          lead="Sites de verdade, para negócios de verdade aqui da região. Passe o mouse no print para ver a página inteira."
        />
        <div className="proj-grid">
          {projetos.map((p, i) => (
            <Projeto key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
