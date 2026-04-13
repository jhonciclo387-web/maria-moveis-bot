# 🛋️ Maria Moveis Bot - Atendimento Automatico WhatsApp

Bot de atendimento automatico 24h para a Maria Moveis.
Integrado com WhatsApp Business API + Claude AI.

---

## O QUE O BOT FAZ

- Responde clientes automaticamente 24h por dia
- Pergunta nome e regiao do cliente
- Confirma se entrega na regiao
- Informa precos, frete e parcelamento
- Envia link do catalogo
- Calcula parcelas no cartao
- Responde duvidas sobre o produto
- Segue toda a metodologia de vendas

---

## PASSO A PASSO PARA CONFIGURAR

### 1. OBTER CHAVE DO CLAUDE (Anthropic)

1. Acesse: https://console.anthropic.com
2. Crie uma conta (ou faca login)
3. Va em "API Keys" e crie uma chave
4. Copie a chave (comeca com sk-ant-...)

---

### 2. CONFIGURAR WHATSAPP BUSINESS API

1. Acesse: https://developers.facebook.com
2. Crie um app (tipo: Business)
3. Adicione o produto "WhatsApp"
4. Em "API Setup", copie:
   - **Phone Number ID**
   - **Token de acesso temporario** (depois gerar permanente)
5. Gere um token permanente:
   - Va em Configuracoes > Usuarios do sistema
   - Crie usuario do sistema com permissao "Mensagens WhatsApp"
   - Gere token permanente

---

### 3. COLOCAR O BOT NA INTERNET (Railway - Gratis)

1. Acesse: https://railway.app e crie conta com GitHub
2. Crie novo projeto > "Deploy from GitHub repo"
3. Faca upload da pasta do bot no GitHub
4. Adicione as variaveis de ambiente (proxima etapa)
5. Railway vai gerar uma URL tipo: https://maria-moveis-bot.up.railway.app

---

### 4. CONFIGURAR AS VARIAVEIS DE AMBIENTE

No Railway (ou onde hospedar), adicione:

```
WHATSAPP_TOKEN=seu_token_permanente
PHONE_NUMBER_ID=seu_phone_number_id
VERIFY_TOKEN=mariamoveis2024
ANTHROPIC_API_KEY=sk-ant-sua_chave
PORT=3000
```

---

### 5. CONFIGURAR O WEBHOOK NO META

1. No painel do Meta for Developers > WhatsApp > Configuration
2. Em "Webhook", clique em "Edit"
3. URL do Webhook: `https://SUA_URL_RAILWAY/webhook`
4. Token de verificacao: `mariamoveis2024`
5. Clique em "Verify and Save"
6. Ative o campo: **messages**

---

### 6. RODAR LOCALMENTE (para testar)

```bash
# Instalar dependencias
npm install

# Copiar e preencher configuracoes
cp .env.example .env
# (edite o arquivo .env com suas chaves)

# Rodar o bot
npm start

# Para desenvolvimento (reinicia automatico)
npm run dev
```

Para testar localmente com webhook, use o ngrok:
```bash
npx ngrok http 3000
# Use a URL do ngrok como webhook no Meta
```

---

## ESTRUTURA DO PROJETO

```
maria-moveis-bot/
├── server.js       # Servidor principal
├── whatsapp.js     # Integracao WhatsApp API
├── claude.js       # Integracao Claude AI + conhecimento
├── conversas.js    # Historico de conversas
├── package.json    # Dependencias
├── .env.example    # Exemplo de configuracao
└── README.md       # Este arquivo
```

---

## CUSTO ESTIMADO

| Servico | Custo |
|---------|-------|
| WhatsApp API | Gratis ate 1.000 conversas/mes |
| Claude API | ~R$0,10 a R$0,30 por conversa |
| Railway (hosting) | Gratis (plano hobby) |
| **Total estimado** | **R$50 a R$150/mes** |

---

## SUPORTE

Em caso de duvidas, abra uma conversa com Claude no Cowork.
