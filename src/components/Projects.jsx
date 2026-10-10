import { projetos } from '../data';

export default function Projects() {
  return (
    <section id="projetos">
      <h2><span className="num">01.</span> projetos</h2>
      <div className="grid">
        {projetos.map((p) => (
          <article className="card" key={p.nome}>
            <div className="card-top">
              <span className="dots"><i /><i /><i /></span>
              <span className="muted">{p.tipo}</span>
            </div>
            <h3>{p.nome}</h3>
            <p>{p.descricao}</p>
            <ul className="list">
              {p.destaques.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <div className="tags">
              {p.stack.map((s) => <span key={s}>{s}</span>)}
            </div>
            <a className="link" href={p.link} target="_blank" rel="noreferrer">
              abrir site ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
