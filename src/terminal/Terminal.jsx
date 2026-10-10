import { useCallback, useEffect, useRef, useState } from 'react';
import { perfil } from '../data';
import { semMovimento } from '../lib/hooks';
import { consumirPendente, fecharTerminal, useTerminal } from '../lib/terminal';
import { setTema, useTema } from '../lib/theme';
import { completar, executar, SUGESTOES, USUARIO } from './comandos';
import './Terminal.css';

function Prompt({ cmd }) {
  return (
    <>
      <span className="ps1-user">
        {USUARIO}@{perfil.host}
      </span>
      :<span className="ps1-path">~</span>$ <span className="tl-cmd">{cmd}</span>
    </>
  );
}

function boasVindas() {
  const quando = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date());
  return [
    <span className="t-accent t-bold">ato.js shell 2.0 · tty1</span>,
    <span className="t-muted">Último login: {quando} de padre-bernardo.go</span>,
    <>
      digite <span className="t-accent">help</span> para ver os comandos.{' '}
      <span className="t-dim">Tab completa · ↑↓ histórico · Esc fecha</span>
    </>,
    '',
  ];
}

// Terminal estilo Quake: desce do topo da tela.
export default function Terminal() {
  const { aberto } = useTerminal();
  const tema = useTema();
  const [linhas, setLinhas] = useState([]);
  const [entrada, setEntrada] = useState('');
  const [posHist, setPosHist] = useState(-1);
  const historico = useRef([]);
  const proximoId = useRef(0);
  const saudou = useRef(false);
  const focoAnterior = useRef(null);
  const inputRef = useRef(null);
  const corpoRef = useRef(null);

  const adicionar = useCallback((novas) => {
    setLinhas((l) => [...l, ...novas.map((n) => ({ id: proximoId.current++, n }))].slice(-400));
  }, []);

  const irPara = useCallback((id) => {
    fecharTerminal();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: semMovimento() ? 'auto' : 'smooth' });
      history.replaceState(null, '', `#${id}`);
    }, 80);
  }, []);

  const rodar = useCallback(
    (bruto) => {
      const texto = bruto.trim();
      adicionar([<Prompt cmd={bruto} />]);
      if (!texto) return;
      const h = historico.current;
      if (h[h.length - 1] !== texto) historico.current = [...h, texto].slice(-100);
      const r = executar(texto, {
        tema: document.documentElement.dataset.theme || 'ato',
        setTema,
        fechar: fecharTerminal,
        irPara,
        abrir: (url) => window.open(url, '_blank', 'noopener'),
        historico: historico.current,
      });
      if (r.limpar) {
        setLinhas([]);
        return;
      }
      if (r.saida?.length) adicionar(r.saida);
    },
    [adicionar, irPara],
  );

  // Ao abrir: mensagem de boas-vindas, comando pendente e foco no input.
  useEffect(() => {
    if (!aberto) return;
    focoAnterior.current = document.activeElement;
    if (!saudou.current) {
      saudou.current = true;
      adicionar(boasVindas());
    }
    const pendente = consumirPendente();
    if (pendente) rodar(pendente);
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 40);
    return () => {
      clearTimeout(t);
      const el = focoAnterior.current;
      if (el && el !== document.body && document.contains(el)) el.focus({ preventScroll: true });
    };
  }, [aberto, adicionar, rodar]);

  useEffect(() => {
    const el = corpoRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [linhas]);

  const enviar = (e) => {
    e.preventDefault();
    rodar(entrada);
    setEntrada('');
    setPosHist(-1);
  };

  const teclas = (e) => {
    const h = historico.current;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!h.length) return;
      const i = posHist < 0 ? h.length - 1 : Math.max(0, posHist - 1);
      setPosHist(i);
      setEntrada(h[i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (posHist < 0) return;
      const i = posHist + 1;
      setPosHist(i >= h.length ? -1 : i);
      setEntrada(i >= h.length ? '' : h[i]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const r = completar(entrada);
      setEntrada(r.valor);
      if (r.opcoes.length > 1) {
        adicionar([<Prompt cmd={entrada} />, <span className="t-muted">{r.opcoes.join('   ')}</span>]);
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setLinhas([]);
    } else if (e.ctrlKey && e.key.toLowerCase() === 'c' && !window.getSelection()?.toString()) {
      e.preventDefault();
      adicionar([<Prompt cmd={`${entrada}^C`} />]);
      setEntrada('');
    }
  };

  return (
    <div
      className={`term ${aberto ? 'aberto' : ''}`}
      inert={!aberto}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          fecharTerminal();
        }
      }}
    >
      <button className="term-fundo" tabIndex={-1} aria-hidden="true" onClick={fecharTerminal} />
      <div className="term-win" role="dialog" aria-modal="true" aria-label="Terminal interativo">
        <div className="term-bar">
          <span className="dots">
            <button className="dot-fechar" onClick={fecharTerminal} aria-label="Fechar terminal">
              <i />
            </button>
            <i />
            <i />
          </span>
          <span className="term-titulo">
            {USUARIO}@{perfil.host}: ~ — zsh
          </span>
          <span className="term-tema t-dim">{tema}</span>
        </div>

        <div className="term-corpo" ref={corpoRef} onClick={() => window.getSelection()?.toString() || inputRef.current?.focus()}>
          <div role="log" aria-live="polite" aria-label="Saída do terminal">
            {linhas.map((l) => (
              <div key={l.id} className="tl">
                {l.n === '' ? ' ' : l.n}
              </div>
            ))}
          </div>
          <form className="term-linha" onSubmit={enviar}>
            <label htmlFor="term-input" className="term-ps1">
              <Prompt cmd="" />
            </label>
            <input
              id="term-input"
              ref={inputRef}
              value={entrada}
              onChange={(e) => {
                setEntrada(e.target.value);
                setPosHist(-1);
              }}
              onKeyDown={teclas}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              aria-label="Digite um comando"
            />
          </form>
        </div>

        <div className="term-chips" aria-label="Comandos sugeridos">
          {SUGESTOES.map((s) => (
            <button
              key={s}
              type="button"
              className="chip"
              onClick={() => {
                rodar(s);
                inputRef.current?.focus({ preventScroll: true });
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
