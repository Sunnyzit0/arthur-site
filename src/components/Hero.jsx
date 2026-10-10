import { perfil } from '../data';
import { zap } from '../lib/whatsapp';
import Typed from './Typed';

export default function Hero() {
  return (
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
  );
}
