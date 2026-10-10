import { perfil } from '../data';

// Cabeçalho de seção: o comando "digita" quando a seção aparece na tela.
export function SectionHead({ id, num, path = '~', cmd, title, lead }) {
  return (
    <header className="sec-head reveal">
      <p className="sec-cmd" aria-hidden="true">
        <span className="ps1-user">
          {perfil.usuario}@{perfil.host}
        </span>
        :<span className="ps1-path">{path}</span>${' '}
        <span className="cmd" style={{ '--n': cmd.length }}>
          {cmd}
        </span>
        <span className="caret" />
      </p>
      <h2 id={id}>
        <span className="num">{num}</span> {title}
      </h2>
      {lead && <p className="sec-lead">{lead}</p>}
    </header>
  );
}

export function Window({ title, extra, className = '', bodyClass = '', children, ...rest }) {
  return (
    <div className={`win ${className}`} {...rest}>
      <div className="win-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="win-title">{title}</span>
        <span className="win-extra">{extra}</span>
      </div>
      <div className={`win-body ${bodyClass}`}>{children}</div>
    </div>
  );
}
