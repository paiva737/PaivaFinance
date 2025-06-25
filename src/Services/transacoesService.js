const CHAVE_LOCAL = 'transacoes_usuario';

export function salvarTransacao(novaTransacao) {
  const transacoes = buscarTransacoes();

  novaTransacao.id = crypto.randomUUID();

  transacoes.push(novaTransacao);
  localStorage.setItem(CHAVE_LOCAL, JSON.stringify(transacoes));
}

export function buscarTransacoes() {
  const dados = localStorage.getItem(CHAVE_LOCAL);
  return dados ? JSON.parse(dados) : [];
}

export function obterTransacoes() {
  return JSON.parse(localStorage.getItem(CHAVE_LOCAL)) || [];
}

export function removerTransacao(id) {
  const transacoes = buscarTransacoes().filter(transacao => transacao.id !== id);
  localStorage.setItem(CHAVE_LOCAL, JSON.stringify(transacoes));
}
