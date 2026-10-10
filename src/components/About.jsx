import { perfil, skills, formacao } from '../data';

export default function About() {
  return (
    <section id="sobre">
      <h2><span className="num">03.</span> sobre</h2>
      <div className="about">
        <div>
          <p className="prompt">$ cat stack.json</p>
          {/* Cada linha quebra entre os itens, com recuo, em vez de rolar para o lado */}
          <pre className="code">
            <span className="line">{'{'}</span>
            {Object.entries(skills).map(([k, v], i, arr) => (
              <span className="line entry" key={k}>
                <span className="key">"{k}"</span>: [
                {v.map((x, j) => (
                  <span key={x}>
                    <span className="item"><span className="str">"{x}"</span>{j < v.length - 1 ? ',' : ''}</span>
                    {j < v.length - 1 ? ' ' : ''}
                  </span>
                ))}
                ]{i < arr.length - 1 ? ',' : ''}
              </span>
            ))}
            <span className="line">{'}'}</span>
          </pre>
        </div>
        <div>
          <p className="prompt">$ ls formacao/</p>
          {formacao.map((f) => (
            <div className="edu" key={f.titulo}>
              <h3>{f.titulo}</h3>
              <p className="muted">{f.local} · {f.periodo}</p>
            </div>
          ))}
          <a className="btn small" href={perfil.github} target="_blank" rel="noreferrer">github ↗</a>
        </div>
      </div>
    </section>
  );
}
