import { cursos, perfil, skills, sobre, trajetoria } from '../data';
import { SectionHead, Window } from './ui';
import './About.css';

const TIPO = {
  freela: { rotulo: 'freela', cor: 't-accent' },
  trabalho: { rotulo: 'trabalho', cor: 't-cyan' },
  estudo: { rotulo: 'estudo', cor: 't-purple' },
};

function StackJson() {
  const entradas = Object.entries(skills);
  return (
    // Cada linha quebra entre os itens, com recuo, em vez de rolar para o lado
    <pre className="code">
      <span className="line">{'{'}</span>
      {entradas.map(([k, v], i) => (
        <span className="line entry" key={k}>
          <span className="key">"{k}"</span>: [
          {v.map((x, j) => (
            <span key={x}>
              <span className="item">
                <span className="str">"{x}"</span>
                {j < v.length - 1 ? ',' : ''}
              </span>
              {j < v.length - 1 ? ' ' : ''}
            </span>
          ))}
          ]{i < entradas.length - 1 ? ',' : ''}
        </span>
      ))}
      <span className="line">{'}'}</span>
    </pre>
  );
}

export default function About() {
  return (
    <section id="sobre" aria-labelledby="t-sobre">
      <div className="wrap">
        <SectionHead
          id="t-sobre"
          num="03."
          cmd="cat sobre.md"
          title="sobre"
          lead="Do cabo de fibra ao deploy: entendo de rede, de servidor e de gente."
        />

        <div className="about-grid">
          <Window title="sobre.md — vim" extra="[+]" className="about-md reveal" bodyClass="md">
            <p className="md-h1">
              <span className="t-dim"># </span>
              {perfil.nome}
            </p>
            {sobre.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="md-h2">
              <span className="t-dim">## </span>agora
            </p>
            <ul className="md-lista">
              <li>
                <span className="t-accent">-</span> {perfil.local}, {perfil.alcance}
              </li>
              <li>
                <span className="t-accent">-</span> Engenharia de Software na UCB
              </li>
              <li>
                <span className="t-accent">-</span> Técnico de fibra óptica na NowNet
              </li>
              <li>
                <span className="t-accent">-</span> <strong>{perfil.status}</strong>
              </li>
            </ul>
            <p className="md-til" aria-hidden="true">
              ~<br />~
            </p>
          </Window>

          <div className="about-lado">
            <Window title="~/.config/stack.json" className="reveal" style={{ '--d': '90ms' }}>
              <StackJson />
            </Window>
            <Window title="~/certificados — ls -1" className="reveal" style={{ '--d': '160ms' }}>
              <ul className="certs">
                {cursos.map((c) => (
                  <li key={c.nome}>
                    <span className="cert-ano">{c.ano}</span>
                    <span className="cert-nome">{c.nome}</span>
                    <span className="cert-onde">{c.onde}</span>
                  </li>
                ))}
              </ul>
            </Window>
          </div>
        </div>

        <div className="trilha reveal">
          <p className="sec-cmd" aria-hidden="true">
            <span className="ps1-user">
              {perfil.usuario}@{perfil.host}
            </span>
            :<span className="ps1-path">~</span>$ journalctl -u carreira --reverse
          </p>
          <h3 className="trilha-titulo">trajetória</h3>
          <ol className="trilha-lista">
            {trajetoria.map((t) => (
              <li key={t.titulo} className="trilha-item">
                <p className="trilha-quando">{t.quando}</p>
                <div className="trilha-corpo">
                  <p className="trilha-cab">
                    <span className={`trilha-tipo ${TIPO[t.tipo].cor}`}>[{TIPO[t.tipo].rotulo}]</span>
                    <strong>{t.titulo}</strong>
                  </p>
                  <p className="trilha-onde">{t.onde}</p>
                  <p className="trilha-texto">{t.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
