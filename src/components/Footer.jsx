import { perfil } from '../data';

export default function Footer() {
  return (
    <footer>
      <span className="muted">© {new Date().getFullYear()} {perfil.nome} · feito com React + Vite</span>
    </footer>
  );
}
