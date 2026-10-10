import { useEffect, useRef, useState } from 'react';
import { perfil } from '../data';
import { zap } from '../lib/whatsapp';
import { Icone } from './icones';
import { SectionHead, Window } from './ui';
import './Contact.css';

const TIPOS = ['Site institucional', 'Portfólio', 'Sistema sob medida', 'Loja / catálogo', 'Ainda não sei'];

function montarMensagem({ nome, tipo, sobre }) {
  const linhas = ['Olá Arthur! Vim pelo seu portfólio.', '', `Nome: ${nome.trim()}`, `Projeto: ${tipo}`];
  if (sobre.trim()) linhas.push(`Sobre: ${sobre.trim()}`);
  return linhas.join('\n');
}

const LINKS = [
  { nome: 'whatsapp', alvo: perfil.telefone, href: zap('Olá Arthur! Vim pelo seu portfólio.'), externo: true },
  { nome: 'email', alvo: perfil.email, href: `mailto:${perfil.email}`, copiar: perfil.email },
  { nome: 'instagram', alvo: '@ato.js', href: perfil.instagram, externo: true },
  { nome: 'github', alvo: perfil.githubUser, href: perfil.github, externo: true },
  { nome: 'linkedin', alvo: 'in/arthuzinho', href: perfil.linkedin, externo: true },
];

function Orcamento() {
  const [dados, setDados] = useState({ nome: '', tipo: TIPOS[0], sobre: '' });
  const [enviado, setEnviado] = useState(false);
  const nomeRef = useRef(null);

  // O terminal (`orcamento`) manda o foco direto para cá
  useEffect(() => {
    const focar = () => setTimeout(() => nomeRef.current?.focus({ preventScroll: true }), 450);
    window.addEventListener('ato:orcamento', focar);
    return () => window.removeEventListener('ato:orcamento', focar);
  }, []);

  const campo = (k) => (e) => setDados((d) => ({ ...d, [k]: e.target.value }));
  const mensagem = montarMensagem(dados);
  const mailto = `mailto:${perfil.email}?subject=${encodeURIComponent(
    `Orçamento de site${dados.nome.trim() ? ` · ${dados.nome.trim()}` : ''}`,
  )}&body=${encodeURIComponent(mensagem)}`;

  const enviar = (e) => {
    e.preventDefault();
    if (!dados.nome.trim()) {
      nomeRef.current?.focus();
      return;
    }
    window.open(`https://wa.me/${perfil.whatsapp}?text=${encodeURIComponent(mensagem)}`, '_blank', 'noopener');
    setEnviado(true);
  };

  return (
    <form className="orc" onSubmit={enviar} noValidate>
      <p className="orc-com"># responda e aperte enter. nada é enviado até você confirmar no WhatsApp.</p>

      <div className="orc-q">
        <label htmlFor="orc-nome">
          <span className="t-accent">?</span> Qual é o seu nome?
        </label>
        <div className="orc-input">
          <span className="t-accent" aria-hidden="true">
            ›
          </span>
          <input
            id="orc-nome"
            ref={nomeRef}
            value={dados.nome}
            onChange={campo('nome')}
            autoComplete="name"
            placeholder="seu nome ou o nome do negócio"
            required
            aria-required="true"
          />
        </div>
      </div>

      <fieldset className="orc-q">
        <legend>
          <span className="t-accent">?</span> Que tipo de projeto?
        </legend>
        <div className="orc-opcoes">
          {TIPOS.map((t) => (
            <label key={t} className="orc-opcao">
              <input type="radio" name="tipo" value={t} checked={dados.tipo === t} onChange={campo('tipo')} />
              <span className="orc-marca" aria-hidden="true" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="orc-q">
        <label htmlFor="orc-sobre">
          <span className="t-accent">?</span> Conta rapidinho sobre o seu negócio{' '}
          <span className="t-dim">(opcional)</span>
        </label>
        <div className="orc-input">
          <span className="t-accent" aria-hidden="true">
            ›
          </span>
          <textarea
            id="orc-sobre"
            rows={3}
            value={dados.sobre}
            onChange={campo('sobre')}
            placeholder="ex.: tenho uma barbearia e quero agendamento online"
          />
        </div>
      </div>

      <div className="orc-acoes">
        <button type="submit" className="btn primary">
          enviar pelo WhatsApp <span aria-hidden="true">⏎</span>
        </button>
        <a className="btn" href={mailto}>
          ou por e-mail
        </a>
      </div>

      <p className="orc-saida" role="status">
        {enviado && (
          <>
            <span className="t-accent">✔</span> mensagem pronta. se o WhatsApp não abriu,{' '}
            <a href={`https://wa.me/${perfil.whatsapp}?text=${encodeURIComponent(mensagem)}`} target="_blank" rel="noreferrer">
              clique aqui
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}

function Copiar({ texto }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="copiar"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(texto);
          setOk(true);
          setTimeout(() => setOk(false), 1800);
        } catch {
          // navegador sem permissão de área de transferência
        }
      }}
      aria-label={ok ? 'E-mail copiado' : 'Copiar e-mail'}
    >
      {ok ? <span className="t-accent">copiado!</span> : Icone.copiar}
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contato" aria-labelledby="t-contato">
      <div className="wrap">
        <SectionHead
          id="t-contato"
          num="05."
          cmd="./orcamento.sh"
          title="contato"
          lead="Tem um projeto ou uma vaga? O script monta a mensagem e abre o WhatsApp. Respondo rápido."
        />
        <div className="contato-grid">
          <Window title="orcamento.sh — zsh" extra="bash" className="reveal">
            <Orcamento />
          </Window>
          <Window title="~/contato — ls -l" className="reveal" style={{ '--d': '100ms' }}>
            <ul className="links">
              {LINKS.map((l) => (
                <li key={l.nome}>
                  <span className="links-perm" aria-hidden="true">
                    lrwxrwxrwx
                  </span>
                  <a href={l.href} {...(l.externo ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    <span className="links-nome">{l.nome}</span>
                    <span className="links-seta" aria-hidden="true">
                      {' '}
                      →{' '}
                    </span>
                    <span className="links-alvo">{l.alvo}</span>
                  </a>
                  {l.copiar && <Copiar texto={l.copiar} />}
                </li>
              ))}
            </ul>
            <p className="links-nota">
              <span className="t-dim">#</span> atendo {perfil.local.split(',')[0]} e região presencialmente, e o resto do Brasil
              online.
            </p>
          </Window>
        </div>
      </div>
    </section>
  );
}
