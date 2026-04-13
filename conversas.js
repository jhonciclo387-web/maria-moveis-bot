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
  if (historicos[numero].length > 20) {
    historicos[numero] = historicos[numero].slice(-20);
  }
}
function limpar(numero) {
  delete historicos[numero];
}
module.exports = { buscar, salvar, limpar };
