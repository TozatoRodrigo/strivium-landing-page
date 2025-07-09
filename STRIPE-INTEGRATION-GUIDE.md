# 🚀 Guia Completo de Integração Stripe - Strivium

## 📋 Pré-requisitos

- Node.js 16+ instalado
- Conta no Stripe (gratuita)
- Git instalado

## ⚠️ **Status Atual do Projeto**

O projeto está **95% completo** e funcional. Apenas algumas configurações são necessárias:

### **✅ Já Implementado:**
- ✅ Frontend responsivo completo (mobile-first)
- ✅ Backend Node.js com API REST
- ✅ Integração Stripe implementada
- ✅ Serverless functions para Vercel
- ✅ Documentação completa
- ✅ GitHub Actions CI/CD

### **⚠️ Pendente (5-15 minutos):**
- ❌ **Dependências do backend não instaladas**
- ❌ **Chaves Stripe precisam ser configuradas**
- ❌ **IDs dos produtos Stripe são placeholders**

## 🏗️ Passo 1: Instalar Dependências

### 1.1 Verificar Status Atual
```bash
cd backend
npm list
# Você verá "UNMET DEPENDENCY" para todas as dependências
```

### 1.2 Instalar Dependências
```bash
cd backend
npm install
# Isso instalará: express, stripe, cors, dotenv, etc.
```

### 1.3 Verificar Instalação
```bash
npm list
# Agora todas as dependências devem estar instaladas
```

## 🏗️ Passo 2: Configuração do Stripe

### 2.1 Criar Conta Stripe
```bash
1. Acesse https://stripe.com
2. Clique em "Começar agora"
3. Preencha os dados da empresa
4. Verifique o email
```

### 2.2 Obter Chaves de API
```bash
1. Acesse Dashboard Stripe
2. Vá em "Desenvolvedores" > "Chaves de API"
3. Copie a chave pública (pk_test_...)
4. Copie a chave secreta (sk_test_...)
```

### 2.3 Criar Produtos e Preços
```bash
1. Dashboard > "Produtos" > "Criar produto"

Produto 1: Strivium Básico
- Nome: Strivium Básico
- Preço: R$ 97,00
- Recorrência: Mensal
- Período de teste: 7 dias
- Copie o ID do preço (price_...)

Produto 2: Strivium Profissional
- Nome: Strivium Profissional
- Preço: R$ 197,00
- Recorrência: Mensal
- Período de teste: 7 dias
- Copie o ID do preço (price_...)

Produto 3: Strivium Enterprise
- Nome: Strivium Enterprise
- Preço: R$ 497,00
- Recorrência: Mensal
- Período de teste: 7 dias
- Copie o ID do preço (price_...)
```

### 2.4 Configurar Webhook
```bash
1. Dashboard > "Desenvolvedores" > "Webhooks"
2. Clique em "Adicionar endpoint"
3. URL: http://localhost:3001/webhook/stripe
4. Eventos:
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_succeeded
   - invoice.payment_failed
5. Copie a "Signing secret" (whsec_...)
```

## 🖥️ Passo 3: Configuração do Backend

### 3.1 Configurar Variáveis de Ambiente
```bash
# Copie o arquivo de exemplo
cd backend
cp env-example.txt .env

# Edite o arquivo .env
nano .env
```

### 3.2 Atualizar .env com suas chaves
```env
STRIPE_SECRET_KEY=sk_test_SUA_CHAVE_SECRETA_AQUI
STRIPE_WEBHOOK_SECRET=whsec_SUA_WEBHOOK_SECRET_AQUI
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:8000
```

### 3.3 Atualizar IDs dos Produtos
```javascript
// Edite backend/server.js
// Substitua os IDs dos produtos pelos IDs reais do Stripe:

const PLANS = {
    basico: {
        priceId: 'price_SEU_ID_BASICO_REAL', // Substitua aqui
        name: 'Plano Básico',
        amount: 9700,
    },
    profissional: {
        priceId: 'price_SEU_ID_PROFISSIONAL_REAL', // Substitua aqui
        name: 'Plano Profissional',
        amount: 19700,
    },
    enterprise: {
        priceId: 'price_SEU_ID_ENTERPRISE_REAL', // Substitua aqui
        name: 'Plano Enterprise',
        amount: 49700,
    }
};
```

### 3.4 Atualizar API Serverless (Vercel)
```javascript
// Edite api/index.js
// Os IDs também precisam ser atualizados aqui, ou use variáveis de ambiente:

const PLANS = {
    basico: {
        priceId: process.env.STRIPE_PRICE_BASICO || 'price_SEU_ID_BASICO_REAL',
        name: 'Plano Básico',
        amount: 9700,
    },
    // ... outros planos
};
```

## 🌐 Passo 4: Configuração do Frontend

### 4.1 Atualizar Chave Pública
```javascript
// Edite js/config.js
const StriviumConfig = {
    stripe: {
        publicKey: 'pk_test_SUA_CHAVE_PUBLICA_AQUI', // Substitua aqui
        currency: 'brl',
        country: 'BR'
    },
    // ... resto da configuração
};
```

## 🧪 Passo 5: Testar Localmente

### 5.1 Executar Backend
```bash
cd backend
npm run dev
# Servidor rodando em http://localhost:3001
```

### 5.2 Executar Frontend
```bash
# Em outro terminal, na raiz do projeto
python3 -m http.server 8000
# ou
npx serve . -p 8000
# Frontend rodando em http://localhost:8000
```

### 5.3 Testar Integração
```bash
1. Abra http://localhost:8000
2. Clique em "Começar Agora" em qualquer plano
3. Preencha o formulário com dados de teste:
   - Email: teste@email.com
   - Nome: Teste da Silva
   - Empresa: Empresa Teste
   - Cartão: 4242 4242 4242 4242
   - CVC: 123
   - Data: 12/25
4. Clique em "Assinar Agora"
5. Verifique se a assinatura foi criada no Dashboard Stripe
```

## 🚀 Passo 6: Deploy em Produção

### 6.1 Configurar Vercel
```bash
# As variáveis de ambiente no Vercel:
STRIPE_SECRET_KEY=sk_live_SUA_CHAVE_SECRETA_PRODUCAO
STRIPE_WEBHOOK_SECRET=whsec_SUA_WEBHOOK_SECRET_PRODUCAO
STRIPE_PRICE_BASICO=price_SEU_ID_BASICO_PRODUCAO
STRIPE_PRICE_PROFISSIONAL=price_SEU_ID_PROFISSIONAL_PRODUCAO
STRIPE_PRICE_ENTERPRISE=price_SEU_ID_ENTERPRISE_PRODUCAO
NODE_ENV=production
```

### 6.2 Atualizar Webhook URL
```bash
# No Dashboard Stripe, edite o webhook:
# URL: https://SEU_PROJETO.vercel.app/webhook/stripe
```

### 6.3 Deploy Automático
```bash
git add .
git commit -m "feat: configure Stripe integration"
git push origin main
# Deploy automático via GitHub Actions
```

## 🔒 Passo 7: Segurança

### 7.1 Validações Implementadas
- ✅ Verificação de assinatura do webhook
- ✅ Validação de dados obrigatórios
- ✅ Tratamento de erros
- ✅ CORS configurado

### 7.2 Para Produção
```bash
1. Use chaves de produção (pk_live_, sk_live_)
2. Configure HTTPS obrigatório
3. Use domínio real no webhook
4. Implemente rate limiting
5. Configure monitoramento
```

## 📊 Passo 8: Endpoints Disponíveis

### 8.1 Backend API
```
POST /api/create-subscription - Criar assinatura
POST /api/cancel-subscription - Cancelar assinatura
GET /api/subscription/:id - Obter dados da assinatura
POST /webhook/stripe - Webhook do Stripe
GET /api/health - Status do servidor
```

### 8.2 Exemplos de Uso
```javascript
// Criar assinatura
fetch('http://localhost:3001/api/create-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        token: 'tok_visa',
        email: 'user@email.com',
        name: 'Nome do Usuário',
        company: 'Empresa',
        plan: 'basico'
    })
});

// Cancelar assinatura
fetch('http://localhost:3001/api/cancel-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        subscriptionId: 'sub_1234567890'
    })
});
```

## 🆘 Troubleshooting

### Problemas Comuns

**1. Erro "UNMET DEPENDENCY"**
```bash
# Solução:
cd backend
npm install
```

**2. Erro 401 no Stripe**
- Verifique se a chave secreta está correta
- Confirme se está usando a chave de teste

**3. Webhook não funciona**
- Verifique se a URL está correta
- Confirme se o webhook secret está correto
- Use ngrok para desenvolvimento local

**4. CORS Error**
- Verifique se CORS_ORIGIN está configurado
- Confirme se o frontend está na URL correta

**5. Produto não encontrado**
- Verifique se os IDs dos produtos estão corretos
- Confirme se os produtos foram criados no Stripe

**6. Modal não abre**
- Verifique se o Stripe.js foi carregado
- Confirme se a chave pública está correta

## ✅ Checklist de Configuração

### **Backend**
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` criado e configurado
- [ ] Chaves Stripe atualizadas
- [ ] IDs dos produtos atualizados
- [ ] Servidor rodando (`npm run dev`)

### **Frontend**
- [ ] Chave pública Stripe atualizada (`js/config.js`)
- [ ] Servidor frontend rodando
- [ ] Modal de pagamento funcional

### **Stripe Dashboard**
- [ ] Produtos criados com preços corretos
- [ ] Webhook configurado e ativo
- [ ] Eventos selecionados corretamente

### **Teste**
- [ ] Pagamento de teste funcional
- [ ] Webhook recebendo eventos
- [ ] Assinatura criada no Stripe

## 🎉 Conclusão

Após seguir todos os passos, você terá:

✅ **Integração Stripe completa**
✅ **Backend Node.js funcional**
✅ **Frontend conectado ao backend**
✅ **Webhook configurado**
✅ **Sistema de assinaturas funcionando**
✅ **Período de teste de 7 dias**
✅ **Monitoramento e logs**
✅ **Deploy automático configurado**

**⏱️ Tempo estimado de configuração:** 15-30 minutos

🚀 **Sua landing page agora processa pagamentos reais com o Stripe!** 