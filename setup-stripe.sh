#!/bin/bash

# 🚀 Script de Configuração Automática - Integração Stripe Strivium
# Execute: chmod +x setup-stripe.sh && ./setup-stripe.sh

echo "🚀 Configurando Integração Stripe - Strivium"
echo "=============================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 16+ primeiro."
    echo "💡 Acesse: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Criar diretório backend se não existir
if [ ! -d "backend" ]; then
    echo "📁 Criando diretório backend..."
    mkdir backend
fi

# Navegar para o backend
cd backend

# Instalar dependências
echo "📦 Instalando dependências do backend..."
npm install

# Criar arquivo .env se não existir
if [ ! -f ".env" ]; then
    echo "⚙️ Criando arquivo .env..."
    cp env-example.txt .env
    echo ""
    echo "🔑 IMPORTANTE: Edite o arquivo backend/.env com suas chaves do Stripe:"
    echo "   - STRIPE_SECRET_KEY=sk_test_SUA_CHAVE_AQUI"
    echo "   - STRIPE_WEBHOOK_SECRET=whsec_SUA_WEBHOOK_SECRET_AQUI"
    echo ""
fi

# Voltar para o diretório raiz
cd ..

echo ""
echo "🎉 Configuração concluída!"
echo "========================="
echo ""
echo "📋 Próximos passos:"
echo "1. Configure sua conta Stripe em: https://stripe.com"
echo "2. Edite backend/.env com suas chaves do Stripe"
echo "3. Edite js/config.js com sua chave pública do Stripe"
echo "4. Execute: cd backend && npm run dev"
echo "5. Em outro terminal: python3 -m http.server 8000"
echo ""
echo "📖 Guia completo: STRIPE-INTEGRATION-GUIDE.md"
echo ""
echo "🚀 Boa sorte com sua integração!" 