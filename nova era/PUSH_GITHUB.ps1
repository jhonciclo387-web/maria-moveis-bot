# Script para fazer Push do Bot para o GitHub
# Execute este arquivo no PowerShell

# Navega para a pasta do bot
cd "C:\Users\User\Documents\Claude\nova era\maria-moveis-bot"

# Inicializa git
git init

# Configura usuário
git config user.email "jhonciclo387@gmail.com"
git config user.name "Jhon"

# Adiciona todos os arquivos
git add .

# Faz commit
git commit -m "Initial commit: Maria Moveis WhatsApp Bot"

# Adiciona URL remota (substitui SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/jhonciclo387-web/maria-moveis-bot.git

# Muda branch para main
git branch -M main

# Faz push
git push -u origin main

Write-Host "Push concluido!" -ForegroundColor Green
