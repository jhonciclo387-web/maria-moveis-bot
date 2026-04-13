require('dotenv').config();
const express = require('express');
const { receberMensagem, verificarWebhook } = require('./whatsapp');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Verificacao do webhook pelo Meta
app.get('/webhook', verificarWebhook);

// Receber mensagens do WhatsApp
app.post('/webhook', receberMensagem);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Maria Moveis Bot rodando!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Maria Moveis Bot rodando na porta ${PORT}`);
  console.log(`📱 Webhook: http://localhost:${PORT}/webhook`);
});
