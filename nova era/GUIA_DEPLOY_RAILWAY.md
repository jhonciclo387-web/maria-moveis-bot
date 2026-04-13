# 🚀 Guia Rápido: Deploy do Bot Maria Móveis no Railway

## Passo 1: Criar Repositório GitHub

1. Acessa **github.com** (cria conta se não tiver)
2. Clica em **"New repository"**
3. Nome: `maria-moveis-bot`
4. Clica em **"Create repository"**

## Passo 2: Fazer Push do Código para GitHub

1. Abre **PowerShell** na pasta `maria-moveis-bot`
   - Segura Shift + clica direito na pasta > "Open PowerShell here"

2. Executa os comandos:
```powershell
git init
git add .
git commit -m "Initial Maria Moveis Bot"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/maria-moveis-bot.git
git push -u origin main
```

(Substitui `SEU_USUARIO` pelo seu username do GitHub)

## Passo 3: Fazer Deploy no Railway

1. Volta pro browser com **railway.com** aberto
2. Clica em **"Create new project"** (ou já deve estar nessa página)
3. Seleciona **"GitHub"**
4. Conecta sua conta GitHub (se já não conectou)
5. Procura pelo repositório **`maria-moveis-bot`**
6. Clica para importar

## Passo 4: Configurar Variáveis de Ambiente

1. No Railway, após criar o projeto, vai aparecer a seção "Variables"
2. Clica em **"Add Variable"** e preenche:
   - `PORT` → `3000`
   - `WHATSAPP_TOKEN` → (você adicionará depois)
   - `PHONE_NUMBER_ID` → (você adicionará depois)
   - `VERIFY_TOKEN` → `mariamoveis2024`
   - `ANTHROPIC_API_KEY` → (sua chave da Anthropic)

## Passo 5: Deploy e Obter URL

1. Railway fará o deploy automaticamente
2. Quando terminar, clica na aba **"Deployments"**
3. Procura pela URL gerada (algo como: `https://maria-moveis-bot-production.up.railway.app`)
4. **Essa é sua URL do webhook!**

## Pronto! 🎉

Seu bot está rodando! Agora é só conectar ao WhatsApp Business API usando essa URL como webhook.

**Próxima etapa:** Configurar webhook no WhatsApp Business
