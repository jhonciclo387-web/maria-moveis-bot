const axios = require('axios');
const { processarMensagem } = require('./claude');
const conversas = require('./conversas');

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const API_URL = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

// Verificacao do webhook pelo Meta
function verificarWebhook(req, res) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('✅ Webhook verificado com sucesso!');
        res.status(200).send(challenge);
  } else {
        console.log('❌ Token de verificacao invalido');
        res.sendStatus(403);
  }
}

// Receber mensagem do WhatsApp
async function receberMensagem(req, res) {
    res.sendStatus(200); // Responder 200 imediatamente pro Meta

  try {
        const body = req.body;
        if (!body.object || !body.entry) return;

      const entry = body.entry[0];
        const changes = entry?.changes[0];
        const value = changes?.value;
        const messages = value?.messages;

      if (!messages || messages.length === 0) return;

      const msg = messages[0];
        const from = msg.from; // numero do cliente
      const tipo = msg.type;

      let textoRecebido = '';

      if (tipo === 'text') {
              textoRecebido = msg.text.body;
      } else if (tipo === 'audio') {
              textoRecebido = '[cliente enviou audio]';
      } else if (tipo === 'image') {
              textoRecebido = '[cliente enviou imagem]';
      } else if (tipo === 'document') {
              textoRecebido = '[cliente enviou documento]';
      } else {
              return; // ignorar outros tipos
      }

      console.log(`📩 Mensagem de ${from}: ${textoRecebido}`);

      // Buscar historico da conversa
      const historico = conversas.buscar(from);

      // Processar com Claude
      const resposta = await processarMensagem(textoRecebido, historico, from);

      if (!resposta) return;

      // Salvar no historico
      conversas.salvar(from, textoRecebido, resposta);

      // Enviar resposta
      await enviarMensagem(from, resposta);

  } catch (err) {
        console.error('❌ Erro ao processar mensagem:', err.message);
  }
}

// Enviar mensagem de texto via WhatsApp API
async function enviarMensagem(para, texto) {
    try {
          await axios.post(API_URL, {
                  messaging_product: 'whatsapp',
                  to: para,
                  type: 'text',
                  text: { body: texto }
          }, {
                  headers: {
                            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
                            'Content-Type': 'application/json'
                  }
          });
          console.log(`✅ Mensagem enviada para ${para}`);
    } catch (err) {
          console.error('❌ Erro ao enviar mensagem:', err.response?.data || err.message);
    }
}

// Enviar link do catalogo
async function enviarCatalogo(para) {
    const texto = `🛋️ Veja nosso catálogo completo:\nhttps://wa.me/c/554191129811`;
    await enviarMensagem(para, texto);
}

module.exports = { verificarWebhook, receberMensagem, enviarMensagem, enviarCatalogo };
