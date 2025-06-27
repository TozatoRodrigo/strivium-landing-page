# 🚀 Guia Completo - Publicar Projeto no GitHub

## 📋 **Opções para Publicar no GitHub**

### **🔥 Opção 1: Script Automático (Recomendado)**

**1. Instalar GitHub CLI:**
```bash
# macOS
brew install gh

# Linux
sudo apt install gh

# Windows
winget install GitHub.cli
```

**2. Executar Script:**
```bash
./create-github-repo.sh
```

**3. Pronto!** 🎉
- Repositório criado automaticamente
- Código enviado para o GitHub
- Pronto para configurar GitHub Pages

---

### **🔧 Opção 2: Manual (Passo a Passo)**

**1. Criar Repositório no GitHub:**
- Acesse [github.com/new](https://github.com/new)
- Nome: `strivium-landing-page`
- Descrição: `🏥 Landing page moderna para plataforma de comunicação médica com integração Stripe`
- Público/Privado (sua escolha)
- **NÃO** marque "Initialize with README"
- Clique em "Create repository"

**2. Conectar Repositório Local:**
```bash
git remote add origin https://github.com/SEU_USUARIO/strivium-landing-page.git
git branch -M main
git push -u origin main
```

**3. Verificar Upload:**
- Acesse seu repositório no GitHub
- Confirme se todos os arquivos foram enviados

---

## 🌐 **Configurar GitHub Pages (Hospedagem Gratuita)**

**1. Acessar Configurações:**
- No seu repositório GitHub
- Clique em "Settings"
- Role até "Pages" na barra lateral

**2. Configurar Source:**
- Source: "Deploy from a branch"
- Branch: "main"
- Folder: "/ (root)"
- Clique em "Save"

**3. Aguardar Deploy:**
- GitHub levará alguns minutos para processar
- Sua landing page estará disponível em:
  `https://SEU_USUARIO.github.io/strivium-landing-page`

---

## 🔧 **Configurações Adicionais**

### **🏷️ Adicionar Topics/Tags:**
```
No repositório GitHub:
Settings > General > Topics
Adicionar: stripe, landing-page, healthcare, nodejs, javascript
```

### **📊 Habilitar GitHub Actions (CI/CD):**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### **🔐 Configurar Secrets (para Stripe):**
```
Settings > Secrets and variables > Actions
Adicionar:
- STRIPE_PUBLIC_KEY
- STRIPE_SECRET_KEY
```

---

## 📈 **Otimizações para GitHub**

### **🎯 README Atrativo:**
- ✅ Badges de tecnologias
- ✅ Screenshots do projeto
- ✅ Instruções claras de instalação
- ✅ Links para demo e documentação

### **📝 Issues Templates:**
```markdown
<!-- .github/ISSUE_TEMPLATE/bug_report.md -->
---
name: Bug Report
about: Reporte um bug
---

**Descreva o bug**
Descrição clara do problema.

**Para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.
```

### **🤝 Pull Request Template:**
```markdown
<!-- .github/pull_request_template.md -->
## Descrição
Breve descrição das mudanças.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Checklist
- [ ] Código testado
- [ ] Documentação atualizada
- [ ] Sem conflitos
```

---

## 🚀 **Comandos Úteis Git**

### **📤 Enviar Mudanças:**
```bash
git add .
git commit -m "✨ Nova funcionalidade: descrição"
git push origin main
```

### **🔄 Atualizar do GitHub:**
```bash
git pull origin main
```

### **🌿 Trabalhar com Branches:**
```bash
# Criar nova branch
git checkout -b feature/nova-funcionalidade

# Enviar branch
git push -u origin feature/nova-funcionalidade

# Voltar para main
git checkout main
```

### **🏷️ Criar Releases:**
```bash
git tag -a v1.0.0 -m "Primeira versão estável"
git push origin v1.0.0
```

---

## 📊 **Métricas e Analytics**

### **📈 GitHub Insights:**
- Acesse "Insights" no seu repositório
- Veja estatísticas de commits, contribuidores, traffic

### **🎯 Google Analytics (opcional):**
```html
<!-- Adicionar no index.html -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔒 **Segurança**

### **⚠️ Nunca Commitar:**
- ❌ Chaves de API do Stripe
- ❌ Senhas ou tokens
- ❌ Arquivos .env
- ❌ Dados sensíveis

### **✅ Usar .gitignore:**
```gitignore
# Já configurado no projeto
.env
.env.local
node_modules/
*.log
```

### **🔐 GitHub Secrets:**
- Use GitHub Secrets para dados sensíveis
- Configure Actions para deploy automático
- Nunca exponha chaves em código público

---

## 🎉 **Resultado Final**

Após seguir este guia, você terá:

✅ **Repositório GitHub profissional**
✅ **Landing page hospedada gratuitamente**
✅ **Documentação completa**
✅ **Integração Stripe funcional**
✅ **Deploy automático configurado**
✅ **Projeto pronto para contribuições**

**🔗 URLs que você terá:**
- Repositório: `https://github.com/SEU_USUARIO/strivium-landing-page`
- Site: `https://SEU_USUARIO.github.io/strivium-landing-page`
- Demo: Link para demonstração online

---

## 📞 **Próximos Passos**

1. **Executar script:** `./create-github-repo.sh`
2. **Configurar GitHub Pages**
3. **Adicionar domínio personalizado (opcional)**
4. **Compartilhar o projeto**
5. **Receber feedback da comunidade**

🚀 **Seu projeto Strivium estará disponível para o mundo!** 