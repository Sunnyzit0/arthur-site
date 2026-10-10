import { perfil } from '../data';

const ano = new Date().getFullYear();

export default function Footer() {
  return (
    <footer>
      <span className="muted">© {ano} {perfil.nome} · feito com React + Vite</span>
    </footer>
  );
}
