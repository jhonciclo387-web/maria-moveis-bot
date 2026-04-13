// Armazena historico de conversas em memoria
// Em producao, considere usar Redis ou banco de dados
const historicos = {};

function buscar(numero) {
  return historicos[numero] || [];
}

function salvar(numero, mensagemCliente, respostaBot) {
  if (!historicos[numero]) {
    historicos[numero] = [];
  }

  historicos[numero].push(
    { role: 'user', content: mensagemCliente },
    { role: 'assistant', content: respostaBot }
  );

  // Manter apenas as ultimas 20 mensagens (10 trocas)
  if (historicos[numero].length > 20) {
    historicos[numero] = historicos[numero].slice(-20);
  }
}

function limpar(numero) {
  delete historicos[numero];
}

module.exports = { buscar, salvar, limpar };
