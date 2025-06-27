# 🚀 Guia Completo de Integração Stripe - Strivium

## 📋 Pré-requisitos

- Node.js 16+ instalado
- Conta no Stripe (gratuita)
- Git instalado

## 🏗️ Passo 1: Configuração do Stripe

### 1.1 Criar Conta Stripe
```bash
1. Acesse https://stripe.com
2. Clique em "Começar agora"
3. Preencha os dados da empresa
4. Verifique o email
```

### 1.2 Obter Chaves de API
```bash
1. Acesse Dashboard Stripe
2. Vá em "Desenvolvedores" > "Chaves de API"
3. Copie a chave pública (pk_test_...)
4. Copie a chave secreta (sk_test_...)
```

### 1.3 Criar Produtos e Preços
```bash
1. Dashboard > "Produtos" > "Criar produto"

Produto 1: Strivium Básico
- Nome: Strivium Básico
- Preço: R$ 97,00
- Recorrência: Mensal
- Período de teste: 7 dias

Produto 2: Strivium Profissional
- Nome: Strivium Profissional
- Preço: R$ 197,00
- Recorrência: Mensal
- Período de teste: 7 dias

Produto 3: Strivium Enterprise
- Nome: Strivium Enterprise
- Preço: R$ 497,00
- Recorrência: Mensal
- Período de teste: 7 dias
```

### 1.4 Configurar Webhook
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

## 🖥️ Passo 2: Configuração do Backend

### 2.1 Instalar Dependências
```bash
cd backend
npm install
```

### 2.2 Configurar Variáveis de Ambiente
```bash
# Copie o arquivo de exemplo
cp env-example.txt .env

# Edite o arquivo .env
nano .env
```

### 2.3 Atualizar .env com suas chaves
```env
STRIPE_SECRET_KEY=sk_test_SUA_CHAVE_SECRETA_AQUI
STRIPE_WEBHOOK_SECRET=whsec_SUA_WEBHOOK_SECRET_AQUI
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:8000
```

### 2.4 Atualizar IDs dos Produtos
```javascript
// Edite backend/server.js
const PLANS = {
    basico: {
        priceId: 'price_SEU_ID_BASICO_AQUI',
        name: 'Plano Básico',
        amount: 9700,
    },
    profissional: {
        priceId: 'price_SEU_ID_PROFISSIONAL_AQUI',
        name: 'Plano Profissional',
        amount: 19700,
    },
    enterprise: {
        priceId: 'price_SEU_ID_ENTERPRISE_AQUI',
        name: 'Plano Enterprise',
        amount: 49700,
    }
};
```

## 🌐 Passo 3: Configuração do Frontend

### 3.1 Atualizar Chave Pública do Stripe
```javascript
// Edite js/config.js
stripe: {
    publicKey: 'pk_test_SUA_CHAVE_PUBLICA_AQUI',
    currency: 'brl',
    country: 'BR'
},
```

## 🚀 Passo 4: Executar a Aplicação

### 4.1 Iniciar Backend
```bash
cd backend
npm run dev
```
O backend estará rodando em: http://localhost:3001

### 4.2 Iniciar Frontend
```bash
# Em outro terminal, na pasta raiz
python3 -m http.server 8000
```
O frontend estará rodando em: http://localhost:8000

## 🧪 Passo 5: Testar a Integração

### 5.1 Cartões de Teste
```
Sucesso: 4242 4242 4242 4242
Falha: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

### 5.2 Dados de Teste
```
Email: qualquer@email.com
Nome: Qualquer Nome
CVC: 123
Data: 12/25
CEP: 01234-567
```

### 5.3 Fluxo de Teste
```bash
1. Acesse http://localhost:8000
2. Clique em "Começar Agora" em qualquer plano
3. Preencha os dados do formulário
4. Use um cartão de teste
5. Verifique no Dashboard Stripe se a assinatura foi criada
```

## 🔍 Passo 6: Monitoramento

### 6.1 Logs do Backend
```bash
# Terminal do backend mostrará:
Nova assinatura criada: sub_1234567890 para usuario@email.com
```

### 6.2 Dashboard Stripe
```bash
1. Acesse Dashboard Stripe
2. Vá em "Pagamentos" para ver transações
3. Vá em "Assinaturas" para ver assinaturas ativas
4. Vá em "Logs" para ver eventos de webhook
```

### 6.3 Teste de Webhook
```bash
# Use ngrok para expor localhost em produção
ngrok http 3001

# Atualize URL do webhook no Stripe para:
https://SEU_NGROK_URL.ngrok.io/webhook/stripe
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
GET /health - Status do servidor
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

**1. Erro 401 no Stripe**
- Verifique se a chave secreta está correta
- Confirme se está usando a chave de teste

**2. Webhook não funciona**
- Verifique se a URL está correta
- Confirme se o webhook secret está correto
- Use ngrok para desenvolvimento local

**3. CORS Error**
- Verifique se CORS_ORIGIN está configurado
- Confirme se o frontend está na URL correta

**4. Produto não encontrado**
- Verifique se os IDs dos produtos estão corretos
- Confirme se os produtos foram criados no Stripe

## 🎉 Conclusão

Após seguir todos os passos, você terá:

✅ **Integração Stripe completa**
✅ **Backend Node.js funcional**
✅ **Frontend conectado ao backend**
✅ **Webhook configurado**
✅ **Sistema de assinaturas funcionando**
✅ **Período de teste de 7 dias**
✅ **Monitoramento e logs**

🚀 **Sua landing page agora processa pagamentos reais com o Stripe!** 