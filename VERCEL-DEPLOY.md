# 🚀 Deploy no Vercel - Strivium Landing Page

## 📋 **Configuração Corrigida**

O projeto foi configurado para funcionar corretamente no Vercel com:

### ✅ **Arquivos Adicionados:**
- `vercel.json` - Configuração do Vercel (corrigido: sem diretório "public")
- `.vercelignore` - Arquivos a serem ignorados no deploy
- `api/index.js` - Serverless function completa
- `api/package.json` - Dependências da API

### ✅ **Configurações:**
- **Frontend**: Arquivos estáticos na raiz (não em pasta "public")
- **Backend**: Serverless functions para API Stripe
- **Roteamento**: Configurado com `rewrites` para `/api/*` e `/webhook/*`
- **Erro Corrigido**: Removido conflito entre `builds` e `functions`
- **Output Directory**: Configurado para servir arquivos da raiz

## 🚨 **Solução para Erro "No Output Directory named 'public' found"**

Se você receber este erro, siga estes passos:

### **Opção 1: Configurar no Dashboard Vercel**
1. **Acesse:** Vercel Dashboard > Seu Projeto > Settings > General
2. **Build & Development Settings:**
   - **Output Directory:** deixe em branco ou coloque `.`
   - **Install Command:** deixe em branco
   - **Build Command:** deixe em branco
3. **Salvar** e fazer novo deploy

### **Opção 2: Via vercel.json (já configurado)**
O arquivo `vercel.json` já está configurado corretamente:
- Sem especificação de diretório "public"
- Arquivos servidos diretamente da raiz
- Serverless functions na pasta `/api`

## 🔧 **Variáveis de Ambiente no Vercel**

Antes do deploy, configure as variáveis de ambiente:

1. **Acesse:** Vercel Dashboard > Seu Projeto > Settings > Environment Variables

2. **Adicione:**
```
STRIPE_SECRET_KEY=sk_test_SUA_CHAVE_SECRETA_AQUI
STRIPE_WEBHOOK_SECRET=whsec_SUA_WEBHOOK_SECRET_AQUI
STRIPE_PRICE_BASICO=price_SEU_ID_BASICO_AQUI
STRIPE_PRICE_PROFISSIONAL=price_SEU_ID_PROFISSIONAL_AQUI
STRIPE_PRICE_ENTERPRISE=price_SEU_ID_ENTERPRISE_AQUI
NODE_ENV=production
```

## 🚀 **Deploy Automático**

Após fazer push das mudanças:

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

O Vercel irá automaticamente:
1. ✅ Detectar as mudanças
2. ✅ Fazer build do frontend
3. ✅ Configurar serverless functions
4. ✅ Deploy em produção

## 🌐 **URLs Resultantes**

Após o deploy:
- **Site:** https://SEU_PROJETO.vercel.app
- **API:** https://SEU_PROJETO.vercel.app/api/create-subscription
- **Webhook:** https://SEU_PROJETO.vercel.app/webhook/stripe

## ⚙️ **Configurar Webhook no Stripe**

1. **Dashboard Stripe** > Desenvolvedores > Webhooks
2. **Editar endpoint** existente
3. **Nova URL:** https://SEU_PROJETO.vercel.app/webhook/stripe
4. **Salvar**

## 🎯 **Funcionalidades Ativas**

Após o deploy, você terá:
- ✅ Landing page responsiva
- ✅ Integração Stripe funcional
- ✅ Sistema de pagamentos
- ✅ Webhook para notificações
- ✅ HTTPS automático
- ✅ CDN global

## 🔄 **Próximos Deploys**

Para futuras atualizações:
```bash
git add .
git commit -m "Sua mensagem"
git push origin main
```

O Vercel fará deploy automático a cada push!

## 📊 **Monitoramento**

- **Logs:** Vercel Dashboard > Functions
- **Analytics:** Vercel Dashboard > Analytics
- **Performance:** Lighthouse integrado

🚀 **Seu projeto está pronto para produção no Vercel!** 