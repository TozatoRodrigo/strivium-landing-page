# 🤝 Contribuindo para o Strivium Landing Page

Obrigado por considerar contribuir para o projeto Strivium! 🎉

## 📋 **Como Contribuir**

### **1. Reportar Bugs**
- Use o template de [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)
- Inclua informações detalhadas sobre o problema
- Adicione screenshots se possível

### **2. Sugerir Funcionalidades**
- Use o template de [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)
- Explique claramente o benefício da funcionalidade
- Considere alternativas

### **3. Contribuir com Código**

#### **Setup do Ambiente**
```bash
# 1. Fork o repositório
# 2. Clone seu fork
git clone https://github.com/SEU_USUARIO/strivium-landing-page.git
cd strivium-landing-page

# 3. Instale dependências
cd backend
npm install

# 4. Configure variáveis de ambiente
cp env-example.txt .env
# Edite .env com suas chaves do Stripe

# 5. Execute localmente
npm run dev
```

#### **Processo de Desenvolvimento**
```bash
# 1. Crie uma branch para sua feature
git checkout -b feature/nova-funcionalidade

# 2. Faça suas mudanças
# 3. Teste localmente
# 4. Commit suas mudanças
git commit -m "feat: adiciona nova funcionalidade"

# 5. Push para seu fork
git push origin feature/nova-funcionalidade

# 6. Abra um Pull Request
```

## 📝 **Padrões de Código**

### **JavaScript**
- Use ES6+ features
- Indentação: 4 espaços
- Ponto e vírgula obrigatório
- Nomes de variáveis em camelCase

### **CSS**
- Use CSS Variables para cores
- Mobile-first approach
- Nomes de classes em kebab-case

### **HTML**
- Use HTML5 semântico
- Indentação: 2 espaços
- Sempre feche tags

### **Commits**
Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
style: mudanças de formatação
refactor: refatoração de código
test: adiciona ou corrige testes
chore: mudanças de build/configuração
```

## 🧪 **Testes**

### **Frontend**
```bash
# Teste manual
python3 -m http.server 8000
# Acesse http://localhost:8000

# Teste em diferentes navegadores
# Teste responsividade
```

### **Backend**
```bash
cd backend
npm test
npm run lint
```

### **Integração Stripe**
```bash
# Use cartões de teste
# 4242 4242 4242 4242 - Sucesso
# 4000 0000 0000 0002 - Falha
```

## 🔍 **Code Review**

### **Checklist do Revisor**
- [ ] Código segue os padrões estabelecidos
- [ ] Funcionalidade funciona como esperado
- [ ] Não quebra funcionalidades existentes
- [ ] Documentação atualizada se necessário
- [ ] Testes passando
- [ ] Performance não foi impactada negativamente

### **Processo de Review**
1. **Autor** abre Pull Request
2. **Revisores** analisam código
3. **Feedback** é dado via comentários
4. **Autor** implementa mudanças solicitadas
5. **Aprovação** e merge

## 📚 **Documentação**

### **Atualizações Necessárias**
- README.md para novas funcionalidades
- Comentários no código para lógica complexa
- CHANGELOG.md para mudanças significativas

## 🚀 **Deploy**

### **Ambiente de Desenvolvimento**
- Local: `http://localhost:8000`
- Backend: `http://localhost:3001`

### **Ambiente de Produção**
- Vercel: Deploy automático no merge para `main`
- GitHub Pages: Configuração manual

## 🏷️ **Labels das Issues**

- `bug` - Problemas/bugs
- `enhancement` - Novas funcionalidades
- `documentation` - Melhorias na documentação
- `good first issue` - Bom para iniciantes
- `help wanted` - Precisa de ajuda
- `priority: high` - Alta prioridade
- `priority: low` - Baixa prioridade

## 💬 **Comunicação**

### **Onde Buscar Ajuda**
- Abra uma Issue para dúvidas
- Use Discussions para conversas gerais
- Comente em Issues existentes

### **Código de Conduta**
- Seja respeitoso e inclusivo
- Aceite feedback construtivo
- Ajude outros contribuidores
- Mantenha discussões focadas no projeto

## 🎯 **Roadmap**

### **Próximas Funcionalidades**
- [ ] Testes automatizados
- [ ] PWA (Progressive Web App)
- [ ] Multi-idioma
- [ ] Analytics avançado
- [ ] A/B Testing

### **Melhorias Técnicas**
- [ ] TypeScript migration
- [ ] Component library
- [ ] Performance optimization
- [ ] Accessibility improvements

## 📊 **Métricas de Qualidade**

- **Code Coverage**: Mínimo 80%
- **Performance**: Lighthouse Score > 90
- **Accessibility**: WCAG 2.1 AA
- **SEO**: Meta tags completas

---

## 🙏 **Agradecimentos**

Obrigado por contribuir para tornar o Strivium melhor! Sua ajuda é muito valiosa para a comunidade médica. 🏥✨ 