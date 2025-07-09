# 🏥 Strivium - Landing Page

> **Plataforma de comunicação médica moderna com integração Stripe para pagamentos**

Uma landing page profissional e totalmente responsiva para o Strivium, plataforma que revoluciona a comunicação entre médicos e pacientes, com sistema completo de pagamentos via Stripe.

![Strivium Preview](https://img.shields.io/badge/Status-Ativo-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white) ![Mobile First](https://img.shields.io/badge/Mobile-First-blue) ![Responsive](https://img.shields.io/badge/Responsive-✅-success)

## 🚀 **Características**

### **Frontend**
- ✅ **Design Responsivo Completo** - Mobile-first, suporta todos os dispositivos (360px+)
- ✅ **Breakpoints Otimizados** - Mobile XS, Mobile, Tablet, Desktop
- ✅ **Touch Optimized** - Botões com 44px mínimo, gestos touch
- ✅ **Animações Suaves** - Transições e efeitos visuais modernos
- ✅ **SEO Otimizado** - Meta tags e estrutura semântica
- ✅ **Performance** - Carregamento rápido e otimizado
- ✅ **Acessibilidade** - Compatível com leitores de tela

### **Backend**
- ✅ **API REST** - Endpoints seguros para processamento de pagamentos
- ✅ **Integração Stripe** - Sistema completo de assinaturas recorrentes
- ✅ **Webhooks** - Notificações automáticas de eventos
- ✅ **Validação** - Tratamento robusto de erros e dados
- ✅ **Segurança** - CORS, validação de tokens e sanitização
- ✅ **Serverless Ready** - Configurado para Vercel

### **Funcionalidades**
- 🔐 **Sistema de Assinaturas** - 3 planos com período de teste gratuito
- 💳 **Pagamentos Seguros** - Processamento via Stripe com PCI compliance
- 📱 **Mobile First** - Interface otimizada para dispositivos móveis
- 🎨 **UI/UX Moderna** - Design limpo e profissional
- 📊 **Dashboard Mockup** - Visualização de métricas e dados
- 🔄 **Deploy Automático** - CI/CD via GitHub Actions

## 📱 **Responsividade Mobile**

### **Breakpoints Implementados**
- **Mobile XS**: 360px - 479px (pequenos smartphones)
- **Mobile**: 480px - 639px (smartphones padrão)
- **Mobile L**: 640px - 767px (smartphones grandes)
- **Tablet**: 768px - 1023px (tablets)
- **Desktop**: 1024px+ (desktop/laptop)

### **Otimizações Mobile**
- ✅ **Touch Targets** - Botões com mínimo 44px de altura
- ✅ **Viewport Optimized** - Meta viewport configurada
- ✅ **Orientation Support** - Suporte a portrait/landscape
- ✅ **High DPI** - Suporte a telas Retina
- ✅ **Performance** - Carregamento otimizado para mobile

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **HTML5** - Estrutura semântica
- **CSS3** - Styling moderno com Grid/Flexbox, CSS Variables
- **JavaScript ES6+** - Classes, async/await, modules
- **Stripe.js** - Integração de pagamentos

### **Backend**
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Stripe API** - Processamento de pagamentos
- **CORS** - Configuração de segurança

### **Deploy & CI/CD**
- **Vercel** - Deploy serverless
- **GitHub Actions** - CI/CD automatizado
- **GitHub Pages** - Hospedagem estática alternativa

## 📁 **Estrutura do Projeto**

```
strivium-landing-page/
├── 📄 index.html              # Página principal
├── 📁 css/
│   └── styles.css             # Estilos principais (responsivo)
├── 📁 js/
│   ├── main.js                # JavaScript principal
│   └── config.js              # Configurações
├── 📁 api/                    # Serverless functions (Vercel)
│   ├── index.js               # API principal
│   └── package.json           # Dependências da API
├── 📁 backend/                # Servidor Node.js (desenvolvimento)
│   ├── server.js              # Servidor principal
│   ├── package.json           # Dependências
│   └── env-example.txt        # Configurações de exemplo
├── 📁 .github/                # GitHub templates e workflows
│   ├── workflows/             # GitHub Actions
│   └── ISSUE_TEMPLATE/        # Templates de issues
├── 📁 assets/                 # Recursos estáticos
├── 📁 images/                 # Imagens e ícones
├── 📄 test-mobile.html        # Página de teste mobile
├── 📄 vercel.json             # Configuração Vercel
├── 📄 STRIPE-INTEGRATION-GUIDE.md  # Guia de integração
├── 📄 VERCEL-DEPLOY.md        # Guia de deploy
└── 📄 README.md               # Este arquivo
```

## 🚀 **Instalação e Configuração**

### **Pré-requisitos**
- Node.js 16+ instalado
- Conta no Stripe (gratuita)
- Git instalado

### **⚠️ Status Atual**
O projeto está **95% completo** e pronto para uso. Apenas algumas configurações são necessárias:

1. **Dependências do backend não instaladas** (5 min)
2. **Chaves Stripe precisam ser configuradas** (15 min)
3. **Webhook precisa ser configurado** (5 min)

### **1. Clonar o Repositório**
```bash
git clone https://github.com/TozatoRodrigo/strivium-landing-page.git
cd strivium-landing-page
```

### **2. Instalar Dependências**
```bash
cd backend
npm install
```

### **3. Configurar Stripe**
1. Crie uma conta em [stripe.com](https://stripe.com)
2. Obtenha suas chaves de API
3. Configure produtos e preços
4. Edite `backend/.env` com suas chaves
5. Edite `js/config.js` com sua chave pública

### **4. Executar o Projeto**

**Backend (desenvolvimento):**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
python3 -m http.server 8000
# ou
npx serve . -p 8000
```

**Teste Mobile:**
```bash
# Abra test-mobile.html para testar responsividade
open test-mobile.html
```

## 🧪 **Testando a Integração**

### **Cartões de Teste**
```
✅ Sucesso: 4242 4242 4242 4242
❌ Falha: 4000 0000 0000 0002
🔐 3D Secure: 4000 0025 0000 3155
```

### **Dados de Teste**
- **Email:** qualquer@email.com
- **Nome:** Qualquer Nome
- **CVC:** 123
- **Data:** 12/25

### **Teste de Responsividade**
1. Abra `test-mobile.html` no navegador
2. Redimensione a janela para testar breakpoints
3. Use DevTools para simular dispositivos móveis
4. Teste orientação portrait/landscape

## 📊 **Planos Disponíveis**

| Plano | Preço | Recursos |
|-------|-------|----------|
| **Básico** | R$ 97/mês | Comunicação básica, até 5 usuários |
| **Profissional** | R$ 197/mês | Recursos avançados, até 20 usuários |
| **Enterprise** | R$ 497/mês | Recursos completos, usuários ilimitados |

*Todos os planos incluem 7 dias de teste gratuito*

## 🔧 **API Endpoints**

```
POST /api/create-subscription    # Criar assinatura
POST /api/cancel-subscription    # Cancelar assinatura  
GET  /api/subscription/:id       # Obter dados da assinatura
POST /webhook/stripe             # Webhook do Stripe
GET  /api/health                 # Status do servidor
```

## 🎨 **Screenshots**

### **Desktop**
![Desktop Preview](https://via.placeholder.com/800x400/4A90E2/FFFFFF?text=Desktop+Preview)

### **Mobile**
![Mobile Preview](https://via.placeholder.com/300x600/4A90E2/FFFFFF?text=Mobile+Preview)

### **Responsividade**
O projeto suporta todos os tamanhos de tela com layouts otimizados:
- Hero section adapta de 2 colunas para 1 coluna
- Grid de features muda de 3 para 1 coluna
- Cards de pricing se empilham verticalmente
- Navegação se transforma em menu mobile

## 🚀 **Deploy**

### **Vercel (Recomendado)**
```bash
# Deploy automático via GitHub
git push origin main
```

### **GitHub Pages**
```bash
# Configurar em Settings > Pages
# Branch: main, Folder: / (root)
```

### **Netlify**
```bash
npm run deploy-netlify
```

## 🤝 **Contribuindo**

Contribuições são muito bem-vindas! Consulte o [Guia de Contribuição](CONTRIBUTING.md) para detalhes.

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add some amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request usando nosso [template](.github/pull_request_template.md)

## 📝 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 **Autor**

**Rodrigo Dias Tozato**
- GitHub: [@TozatoRodrigo](https://github.com/TozatoRodrigo)
- LinkedIn: [Rodrigo Dias Tozato](https://linkedin.com/in/rodrigodiastozato)

## 🙏 **Agradecimentos**

- [Stripe](https://stripe.com) pela excelente API de pagamentos
- [Vercel](https://vercel.com) pela plataforma de deploy
- [GitHub](https://github.com) pela hospedagem do código

## 📞 **Suporte**

Se você encontrar algum problema ou tiver dúvidas:

1. Consulte o [Guia de Integração](STRIPE-INTEGRATION-GUIDE.md)
2. Leia o [Guia de Deploy](VERCEL-DEPLOY.md)
3. Consulte o [Guia de Contribuição](CONTRIBUTING.md)
4. Abra uma [Issue](https://github.com/TozatoRodrigo/strivium-landing-page/issues) usando nossos templates
5. Consulte o [Changelog](CHANGELOG.md) para ver mudanças recentes

## 🔄 **Status do Projeto**

### **✅ Implementado**
- Landing page responsiva completa
- Sistema de pagamentos Stripe
- Backend Node.js funcional
- Deploy automático Vercel
- Documentação completa
- GitHub Actions CI/CD
- Responsividade mobile-first
- Templates de issues/PRs

### **⚠️ Pendente**
- Instalação de dependências do backend
- Configuração de chaves Stripe
- Testes automatizados
- PWA (Progressive Web App)
- Multi-idioma

### **📊 Métricas**
- **Código:** 507 linhas (HTML), 1200+ linhas (CSS), 521 linhas (JS)
- **Documentação:** 15+ arquivos
- **Responsividade:** 5 breakpoints
- **Performance:** Otimizado para mobile

---

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐

**🔗 Links Úteis:**
- [Repositório](https://github.com/TozatoRodrigo/strivium-landing-page)
- [Demo](https://TozatoRodrigo.github.io/strivium-landing-page)
- [Issues](https://github.com/TozatoRodrigo/strivium-landing-page/issues)
- [Changelog](CHANGELOG.md)

**📅 Última atualização:** 09 de Julho de 2025
