import { perfil } from '../data';

export default function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="logo">~/{perfil.handle}</a>
      <nav>
        <a href="#projetos">projetos</a>
        <a href="#servicos">serviços</a>
        <a href="#sobre">sobre</a>
        <a href="#contato">contato</a>
      </nav>
    </header>
  );
}
