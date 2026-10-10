import { perfil, processo, servicos } from '../data';
import { zap } from '../lib/whatsapp';
import { SectionHead } from './ui';
import './Services.css';

export default function Services() {
  return (
    <section id="servicos" aria-labelledby="t-servicos">
      <div className="wrap">
        <SectionHead
          id="t-servicos"
          num="02."
          cmd="apt search servicos"
          title="serviços"
          lead="Do site simples ao sistema completo. Orçamento sem compromisso, direto no WhatsApp."
        />

        <div className="svc-grid">
          {servicos.map((s, i) => (
            <article key={s.pacote} className="svc reveal" style={{ '--d': `${i * 80}ms` }}>
              <p className="svc-pkg">
                <span className="t-accent">{s.pacote}</span>
                <span className="t-dim">/stable</span>
              </p>
              <h3>{s.titulo}</h3>
              <p className="svc-texto">{s.texto}</p>
              <ul className="svc-inclui" aria-label="Inclui">
                {s.inclui.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <a
                className="svc-cta"
                href={zap(`Olá Arthur! Tenho interesse em: ${s.titulo}.`)}
                target="_blank"
                rel="noreferrer"
              >
                $ sudo apt install {s.pacote}
                <span className="sr-only"> (pedir orçamento pelo WhatsApp)</span>
              </a>
            </article>
          ))}
        </div>

        <div className="proc reveal">
          <p className="sec-cmd" aria-hidden="true">
            <span className="ps1-user">
              {perfil.usuario}@{perfil.host}
            </span>
            :<span className="ps1-path">~/como-funciona</span>$ git log --reverse --oneline
          </p>
          <h3 className="proc-titulo">como funciona</h3>
          <ol className="proc-lista">
            {processo.map((p, i) => (
              <li key={p.hash} className="proc-item">
                <span className="proc-no" aria-hidden="true" />
                <p className="proc-hash">
                  <span className="t-yellow">{p.hash}</span>
                  {i === processo.length - 1 && <span className="proc-head"> (HEAD → main)</span>}
                </p>
                <p className="proc-nome">
                  <span className="t-dim">0{i + 1}</span> {p.titulo}
                </p>
                <p className="proc-texto">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
