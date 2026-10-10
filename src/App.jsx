import { useEffect, useState } from 'react';
import { perfil, projetos, servicos, skills, formacao } from './data';

function Typed({ text }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), 45);
    return () => clearTimeout(t);
  }, [n, text]);
  return (
    <span>
      {text.slice(0, n)}
      <span className="cursor">▋</span>
    </span>
  );
}

const zap = (msg) =>
  `https://wa.me/${perfil.whatsapp}?text=${encodeURIComponent(msg)}`;

export default function App() {
  return (
    <>
      <header className="nav">
        <a href="#top" className="logo">~/{perfil.handle}</a>
        <nav>
          <a href="#projetos">projetos</a>
          <a href="#servicos">serviços</a>
          <a href="#sobre">sobre</a>
          <a href="#contato">contato</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="prompt">arthur@dev:~$ whoami</p>
          <h1>
            <Typed text={perfil.nome} />
          </h1>
          <p className="role">
            <span className="accent">&gt;</span> {perfil.cargo} · {perfil.local}
          </p>
          <p className="bio">{perfil.bio}</p>
          <div className="ctas">
            <a className="btn primary" href={zap('Olá Arthur! Vi seu portfólio e quero um site.')} target="_blank" rel="noreferrer">
              quero um site
            </a>
            <a className="btn" href="#projetos">ver projetos</a>
          </div>
        </section>

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

        <section id="servicos">
          <h2><span className="num">02.</span> serviços</h2>
          <div className="grid four">
            {servicos.map((s) => (
              <div className="service" key={s.titulo}>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="sobre">
          <h2><span className="num">03.</span> sobre</h2>
          <div className="about">
            <div>
              <p className="prompt">$ cat stack.json</p>
              <pre className="code">
                {'{\n'}
                {Object.entries(skills).map(([k, v], i, arr) => (
                  <span key={k}>
                    {'  '}<span className="key">"{k}"</span>: [
                    {v.map((x, j) => (
                      <span key={x}><span className="str">"{x}"</span>{j < v.length - 1 ? ', ' : ''}</span>
                    ))}
                    ]{i < arr.length - 1 ? ',' : ''}{'\n'}
                  </span>
                ))}
                {'}'}
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

        <section id="contato" className="contact">
          <h2><span className="num">04.</span> contato</h2>
          <p className="bio">Tem um projeto ou uma vaga? Me chama — respondo rápido.</p>
          <div className="ctas">
            <a className="btn primary" href={zap('Olá Arthur! Vim pelo seu portfólio.')} target="_blank" rel="noreferrer">whatsapp</a>
            <a className="btn" href={`mailto:${perfil.email}`}>e-mail</a>
            <a className="btn" href={perfil.instagram} target="_blank" rel="noreferrer">instagram</a>
            <a className="btn" href={perfil.github} target="_blank" rel="noreferrer">github</a>
          </div>
        </section>
      </main>

      <footer>
        <span className="muted">© {new Date().getFullYear()} {perfil.nome} · feito com React + Vite</span>
      </footer>
    </>
  );
}
