import { useEffect } from 'react';
import About from './components/About';
import Activity from './components/Activity';
import Boot from './components/Boot';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import StatusLine from './components/StatusLine';
import TopBar from './components/TopBar';
import { useReveal, useSecaoAtiva } from './lib/hooks';
import { IDS } from './lib/secoes';
import { abrirTerminal, alternarTerminal } from './lib/terminal';
import Matrix from './terminal/Matrix';
import Terminal from './terminal/Terminal';

// Atalhos globais: `:` ou a tecla abaixo do Esc abrem o terminal; Ctrl/Cmd+K alterna.
function useAtalhos() {
  useEffect(() => {
    const tecla = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        alternarTerminal();
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === ':' || e.code === 'Backquote') {
        e.preventDefault();
        abrirTerminal();
      }
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, []);
}

export default function App() {
  const ativa = useSecaoAtiva(IDS);
  useReveal();
  useAtalhos();

  return (
    <>
      <a className="skip" href="#conteudo">
        pular para o conteúdo
      </a>
      <Boot />
      <TopBar ativa={ativa} />
      <main id="conteudo">
        <Hero />
        <Projects />
        <Services />
        <About />
        <Activity />
        <Contact />
      </main>
      <Footer />
      <StatusLine ativa={ativa} />
      <Terminal />
      <Matrix />
    </>
  );
}
