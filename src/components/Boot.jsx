import { useEffect } from 'react';
import { projetos } from '../data';
import './Boot.css';

const OK = <span className="boot-ok">[  OK  ]</span>;

const LINHAS = [
  [null, 'ato.js BIOS v2.6.10 · POST concluído'],
  [null, 'CPU: cérebro do Arthur @ 3.2 GHz (turbo com café)'],
  [null, 'Rede: link de fibra óptica ativo · 1 Gbps'],
  [null, 'Carregando kernel react-19.2 ........................ ok'],
  [OK, 'Montado /home/arthur'],
  [OK, 'Iniciado servidor de café'],
  [OK, 'Conectado à rede de fibra óptica'],
  [OK, `Carregados ${projetos.length} projetos`],
  [OK, 'Iniciado portfolio.service'],
  [OK, 'Alcançado alvo: pronto para novos clientes'],
  [null, ''],
  [null, 'ato login: arthur (login automático)'],
];

// Tela de boot estilo systemd. Ela só aparece quando o script inline do
// index.html liga a classe `booting` (primeira visita da sessão, sem
// "reduzir movimento"). As linhas surgem só com CSS; aqui só controlamos o fim.
export default function Boot() {
  useEffect(() => {
    const raiz = document.documentElement;
    if (!raiz.classList.contains('booting')) return;
    let terminou = false;
    let saida;

    const fim = () => {
      if (terminou) return;
      terminou = true;
      raiz.classList.add('boot-out');
      saida = setTimeout(() => {
        raiz.classList.remove('booting', 'boot-out');
        try {
          sessionStorage.setItem('ato:booted', '1');
        } catch {
          // sem sessionStorage o boot aparece de novo na próxima visita
        }
        window.dispatchEvent(new Event('ato:booted'));
      }, 380);
    };

    const pular = (e) => {
      if (e.type === 'keydown' && ['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
      fim();
    };
    const auto = setTimeout(fim, 2300);
    window.addEventListener('keydown', pular);
    window.addEventListener('pointerdown', pular);
    return () => {
      clearTimeout(auto);
      clearTimeout(saida);
      window.removeEventListener('keydown', pular);
      window.removeEventListener('pointerdown', pular);
    };
  }, []);

  return (
    <div className="boot" aria-hidden="true">
      <div className="boot-lines">
        {LINHAS.map(([prefixo, texto], i) => (
          <p key={i} style={{ '--i': i }}>
            {prefixo} {texto || ' '}
          </p>
        ))}
      </div>
      <p className="boot-skip">pressione qualquer tecla para pular</p>
    </div>
  );
}
