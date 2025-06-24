const CHAVE_LOCAL = 'transacoes_usuario';

export function salvarTransacao(novaTransacao) {
  const transacoes = buscarTransacoes();
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

