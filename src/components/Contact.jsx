import { perfil } from '../data';
import { zap } from '../lib/whatsapp';

export default function Contact() {
  return (
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
  );
}
