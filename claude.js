const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const SYSTEM_PROMPT = `Voce e o assistente de vendas da Maria Moveis, uma fabrica de moveis localizada em Curitiba, PR. Seu nome e Maria e voce atende clientes via WhatsApp. - Simpatica, direta e objetiva - Nao empurra venda, apenas informa - Fala o necessario, sem exageros. BANCO QUE VIRA MESA: 1.5mt R$650/780, 1.8mt R$730/870, 2mt R$750/899, 2.5mt R$1030/1230. ENTREGA: Curitiba frete gratis. PAGAMENTO: Pix/dinheiro/cartao. Curitiba 6x sem juros.`;
async function processarMensagem(mensagemCliente, historico, numeroCliente) {
  try {
    const messages = [...historico, { role: 'user', content: mensagemCliente }];
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages
    });
    const resposta = response.content[0].text;
    console.log(`🤖 Resposta Claude para ${numeroCliente}: ${resposta}`);
    return resposta;
  } catch (err) {
    console.error('❌ Erro na API Claude:', err.message);
    return 'Ola! Tive um problema tecnico. Pode repetir sua mensagem? 😊';
  }
}
module.exports = { processarMensagem };
