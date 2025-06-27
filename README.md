# 🏥 Strivium - Landing Page

> **Plataforma de comunicação médica moderna com integração Stripe para pagamentos**

Uma landing page profissional e responsiva para o Strivium, plataforma que revoluciona a comunicação entre médicos e pacientes, com sistema completo de pagamentos via Stripe.

![Strivium Preview](https://img.shields.io/badge/Status-Ativo-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)

## 🚀 **Características**

### **Frontend**
- ✅ **Design Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
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

### **Funcionalidades**
- 🔐 **Sistema de Assinaturas** - 3 planos com período de teste gratuito
- 💳 **Pagamentos Seguros** - Processamento via Stripe com PCI compliance
- 📱 **Mobile First** - Interface otimizada para dispositivos móveis
- 🎨 **UI/UX Moderna** - Design limpo e profissional
- 📊 **Dashboard Mockup** - Visualização de métricas e dados

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **HTML5** - Estrutura semântica
- **CSS3** - Styling moderno com Grid/Flexbox
- **JavaScript ES6+** - Funcionalidades interativas
- **Stripe.js** - Integração de pagamentos

### **Backend**
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Stripe API** - Processamento de pagamentos
- **CORS** - Configuração de segurança

## 📁 **Estrutura do Projeto**

```
strivium-landing-page/
├── 📄 index.html              # Página principal
├── 📁 css/
│   └── styles.css             # Estilos principais
├── 📁 js/
│   ├── main.js                # JavaScript principal
│   └── config.js              # Configurações
├── 📁 assets/                 # Recursos estáticos
├── 📁 images/                 # Imagens e ícones
├── 📁 backend/                # Servidor Node.js
│   ├── server.js              # Servidor principal
│   ├── package.json           # Dependências
│   └── env-example.txt        # Configurações de exemplo
├── 📄 STRIPE-INTEGRATION-GUIDE.md  # Guia de integração
├── 📄 setup-stripe.sh         # Script de instalação
└── 📄 README.md               # Este arquivo
```

## 🚀 **Instalação e Configuração**

### **Pré-requisitos**
- Node.js 16+ instalado
- Conta no Stripe (gratuita)
- Git instalado

### **1. Clonar o Repositório**
```bash
git clone https://github.com/TozatoRodrigo/strivium-landing-page.git
cd strivium-landing-page
```

### **2. Configuração Automática**
```bash
chmod +x setup-stripe.sh
./setup-stripe.sh
```

### **3. Configurar Stripe**
1. Crie uma conta em [stripe.com](https://stripe.com)
2. Obtenha suas chaves de API
3. Edite `backend/.env` com suas chaves
4. Edite `js/config.js` com sua chave pública

### **4. Executar o Projeto**

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
python3 -m http.server 8000
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

## 📊 **Planos Disponíveis**

| Plano | Preço | Recursos |
|-------|-------|----------|
| **Básico** | R$ 97/mês | Comunicação básica, 100 pacientes |
| **Profissional** | R$ 197/mês | Recursos avançados, 500 pacientes |
| **Enterprise** | R$ 497/mês | Recursos completos, pacientes ilimitados |

*Todos os planos incluem 7 dias de teste gratuito*

## 🔧 **API Endpoints**

```
POST /api/create-subscription    # Criar assinatura
POST /api/cancel-subscription    # Cancelar assinatura  
GET  /api/subscription/:id       # Obter dados da assinatura
POST /webhook/stripe             # Webhook do Stripe
GET  /health                     # Status do servidor
```

## 🎨 **Screenshots**

### **Desktop**
![Desktop Preview](https://via.placeholder.com/800x400/4A90E2/FFFFFF?text=Desktop+Preview)

### **Mobile**
![Mobile Preview](https://via.placeholder.com/300x600/4A90E2/FFFFFF?text=Mobile+Preview)

## 🤝 **Contribuindo**

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 **Autor**

**Rodrigo Dias Tozato**
- GitHub: [@TozatoRodrigo](https://github.com/TozatoRodrigo)
- LinkedIn: [Rodrigo Dias Tozato](https://linkedin.com/in/rodrigodiastozato)

## 🙏 **Agradecimentos**

- [Stripe](https://stripe.com) pela excelente API de pagamentos
- [Font Awesome](https://fontawesome.com) pelos ícones
- [Google Fonts](https://fonts.google.com) pelas fontes

## 📞 **Suporte**

Se você encontrar algum problema ou tiver dúvidas:

1. Consulte o [Guia de Integração](STRIPE-INTEGRATION-GUIDE.md)
2. Abra uma [Issue](https://github.com/TozatoRodrigo/strivium-landing-page/issues)
3. Entre em contato via email

---

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐ 