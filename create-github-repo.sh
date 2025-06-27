#!/bin/bash

# 🚀 Script para Criar Repositório no GitHub - Strivium Landing Page
# Execute: chmod +x create-github-repo.sh && ./create-github-repo.sh

echo "🚀 Criando Repositório GitHub - Strivium Landing Page"
echo "====================================================="

# Verificar se GitHub CLI está instalado
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI não encontrado."
    echo ""
    echo "📥 Para instalar o GitHub CLI:"
    echo "   macOS: brew install gh"
    echo "   Linux: sudo apt install gh"
    echo "   Windows: winget install GitHub.cli"
    echo ""
    echo "📖 Ou siga as instruções em: https://cli.github.com/"
    echo ""
    echo "🔧 Após instalar, execute: gh auth login"
    echo ""
    exit 1
fi

echo "✅ GitHub CLI encontrado"

# Verificar se está autenticado
if ! gh auth status &> /dev/null; then
    echo "🔐 Fazendo login no GitHub..."
    gh auth login
fi

echo "✅ Autenticado no GitHub"

# Nome do repositório
REPO_NAME="strivium-landing-page"

# Criar repositório no GitHub
echo "📁 Criando repositório '$REPO_NAME'..."
gh repo create $REPO_NAME \
    --description "🏥 Landing page moderna para plataforma de comunicação médica com integração Stripe completa" \
    --public \
    --source=. \
    --remote=origin \
    --push

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Repositório criado com sucesso!"
    echo "=================================="
    echo ""
    echo "🔗 URL do repositório: https://github.com/$(gh api user --jq .login)/$REPO_NAME"
    echo "📊 GitHub Pages: https://$(gh api user --jq .login).github.io/$REPO_NAME"
    echo ""
    echo "📋 Próximos passos:"
    echo "1. Configure GitHub Pages em Settings > Pages"
    echo "2. Adicione suas chaves Stripe nas variáveis de ambiente"
    echo "3. Configure domínio personalizado (opcional)"
    echo ""
    echo "🚀 Seu projeto está agora no GitHub!"
else
    echo "❌ Erro ao criar repositório"
    echo ""
    echo "💡 Alternativa manual:"
    echo "1. Acesse https://github.com/new"
    echo "2. Nome: $REPO_NAME"
    echo "3. Descrição: Landing page moderna para plataforma de comunicação médica"
    echo "4. Público/Privado conforme preferir"
    echo "5. Crie o repositório"
    echo "6. Execute os comandos abaixo:"
    echo ""
    echo "   git remote add origin https://github.com/SEU_USUARIO/$REPO_NAME.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi 