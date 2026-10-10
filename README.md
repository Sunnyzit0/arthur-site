# Arthur da Costa Silva — Portfólio

Site pessoal de **Arthur da Costa Silva** ([@ato.js](https://instagram.com/ato.js)), desenvolvedor web em Padre Bernardo, GO. Apresenta projetos, serviços e formas de contato, com visual inspirado em terminal.

**Stack:** React 19 · Vite · CSS puro · deploy na Vercel

## Rodando local

```bash
npm install
npm run dev       # http://localhost:5173
```

| Comando           | O que faz                          |
| ----------------- | ---------------------------------- |
| `npm run dev`     | servidor local com hot reload      |
| `npm run build`   | gera a versão de produção em `dist/` |
| `npm run preview` | serve o `dist/` para testar o build |
| `npm run lint`    | verifica o código com oxlint       |

## Estrutura

```
src/
├── data.js           ← todos os textos, links e projetos
├── App.jsx           ← monta a página
├── components/       ← uma seção por arquivo (Hero, Projects, Services…)
├── lib/whatsapp.js   ← gera links do WhatsApp com mensagem pronta
└── index.css         ← estilos e tema
public/               ← arquivos servidos como estão (favicon, imagens)
```

## Editando o conteúdo

Não precisa mexer nos componentes: tudo que aparece no site vem de [`src/data.js`](src/data.js).

- **perfil**: nome, bio, WhatsApp (só dígitos, com `55` + DDD), e-mail e redes
- **projetos**: cada projeto vira um card
- **servicos**, **skills**, **formacao**: as demais seções

## Deploy

Importe o repositório na [Vercel](https://vercel.com/new). Ela detecta o Vite sozinha, e cada push na `main` publica uma nova versão.
