import { perfil, reposAtividade } from '../data';

const CHAVE = 'ato:commits';
const VALIDADE = 10 * 60 * 1000; // 10 min: a API pública aceita 60 pedidos/hora por IP

// Últimos commits dos repositórios do portfólio, do mais novo para o mais antigo.
export async function ultimosCommits(limite = 8) {
  try {
    const cache = JSON.parse(sessionStorage.getItem(CHAVE) || 'null');
    if (cache && Date.now() - cache.em < VALIDADE) return cache.commits;
  } catch {
    // sessionStorage indisponível: segue sem cache
  }

  const respostas = await Promise.all(
    reposAtividade.map(async (repo) => {
      const r = await fetch(`https://api.github.com/repos/${perfil.githubUser}/${repo}/commits?per_page=5`, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!r.ok) throw new Error(r.status === 403 ? 'limite da API do GitHub atingido' : `HTTP ${r.status}`);
      const lista = await r.json();
      return lista.map((c) => ({
        sha: c.sha.slice(0, 7),
        repo,
        msg: c.commit.message.split('\n')[0],
        data: c.commit.author?.date || c.commit.committer?.date,
        url: c.html_url,
      }));
    }),
  );

  const commits = respostas
    .flat()
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, limite);
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify({ em: Date.now(), commits }));
  } catch {
    // ignora
  }
  return commits;
}
