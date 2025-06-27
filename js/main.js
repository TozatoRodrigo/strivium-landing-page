// Configurações vindas do config.js
let stripe = null;
let elements = null;
let cardElement = null;

// Configuração dos estilos do cartão
const cardStyle = {
    base: {
        color: '#32325d',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
};

// Estado da aplicação
const AppState = {
    selectedPlan: null,
    selectedPrice: null,
    isProcessing: false,
    stripeInitialized: false
};

// Inicialização da aplicação
class StriviumApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupStripe();
        this.setupEventListeners();
        this.setupAnimations();
    }

    setupStripe() {
        try {
            // Inicializar Stripe apenas uma vez
            if (!AppState.stripeInitialized) {
                const debugMode = getConfig('debug.enabled');
                const stripeKey = getConfig('stripe.publicKey');
                
                if (debugMode) console.log('Inicializando Stripe...');
                
                // Verificar se Stripe está disponível
                if (typeof Stripe === 'undefined') {
                    throw new Error('Stripe.js não foi carregado');
                }
                
                if (!stripeKey) {
                    throw new Error('Chave pública do Stripe não configurada');
                }
                
                stripe = Stripe(stripeKey);
                elements = stripe.elements();
                AppState.stripeInitialized = true;
                
                if (debugMode) console.log('Stripe inicializado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao inicializar Stripe:', error);
            this.showStripeError('Erro ao carregar sistema de pagamento. Recarregue a página.');
        }
    }

    showStripeError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #f44336; color: white; padding: 15px; border-radius: 5px; z-index: 9999; max-width: 300px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
        errorDiv.innerHTML = `
            <strong>⚠️ Erro de Pagamento</strong><br>
            ${message}
            <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: white; cursor: pointer; font-size: 16px; margin-left: 10px;">×</button>
        `;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 8000);
    }

    initializeCardElement() {
        try {
            const debugMode = getConfig('debug.enabled');
            if (debugMode) console.log('Inicializando Card Element...');
            
            // Verificar se Stripe está inicializado
            if (!stripe || !elements) {
                console.error('Stripe não está inicializado');
                this.showStripeError('Sistema de pagamento não inicializado. Recarregue a página.');
                return;
            }

            // Verificar se já existe um elemento montado
            if (cardElement) {
                if (debugMode) console.log('Desmontando Card Element existente...');
                try {
                    cardElement.unmount();
                } catch (e) {
                    if (debugMode) console.log('Elemento já estava desmontado');
                }
                cardElement = null;
            }

            // Verificar se o elemento DOM existe
            const cardContainer = document.getElementById('card-element');
            if (!cardContainer) {
                console.error('Elemento #card-element não encontrado');
                this.showError('Erro interno: elemento do cartão não encontrado.');
                return;
            }

            // Limpar container antes de montar
            cardContainer.innerHTML = '';

            // Criar e montar o elemento do cartão
            cardElement = elements.create('card', { style: cardStyle });
            cardElement.mount('#card-element');
            
            cardElement.on('change', this.handleCardChange.bind(this));
            
            if (debugMode) console.log('Stripe Card Element inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar Card Element:', error);
            this.showError('Erro ao carregar formulário do cartão. Tente fechar e abrir o modal novamente.');
        }
    }

    setupEventListeners() {
        // Botões de planos
        document.querySelectorAll('.btn-select-plan').forEach(button => {
            button.addEventListener('click', this.handlePlanSelection.bind(this));
        });

        // Modal
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', this.closeModal.bind(this));
        }

        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.addEventListener('click', this.handleModalClick.bind(this));
        }

        // Formulário de pagamento
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            paymentForm.addEventListener('submit', this.handlePaymentSubmit.bind(this));
        }

        // Navegação suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // ESC para fechar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    setupAnimations() {
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        document.querySelectorAll('.feature-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    handlePlanSelection(event) {
        const button = event.target;
        AppState.selectedPlan = button.getAttribute('data-plan');
        AppState.selectedPrice = button.getAttribute('data-price');
        this.openModal();
    }

    openModal() {
        if (!AppState.selectedPlan || !AppState.selectedPrice) return;

        // Atualizar informações do modal
        this.updateModalContent();
        
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Inicializar Stripe Card Element quando o modal abrir
            setTimeout(() => {
                this.initializeCardElement();
                const firstInput = modal.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
        }
    }

    updateModalContent() {
        const planNameElement = document.getElementById('selected-plan-name');
        const planPriceElement = document.getElementById('selected-plan-price');
        const priceAfterTrialElement = document.getElementById('price-after-trial');
        
        if (planNameElement) {
            planNameElement.textContent = this.capitalizeFirst(AppState.selectedPlan);
        }
        if (planPriceElement) {
            planPriceElement.textContent = AppState.selectedPrice;
        }
        if (priceAfterTrialElement) {
            priceAfterTrialElement.textContent = AppState.selectedPrice;
        }
    }

    closeModal() {
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        this.resetModal();
    }

    resetModal() {
        const checkoutForm = document.getElementById('checkout-form');
        const successMessage = document.getElementById('success-message');
        const paymentForm = document.getElementById('payment-form');
        const cardErrors = document.getElementById('card-errors');
        
        if (checkoutForm) checkoutForm.style.display = 'block';
        if (successMessage) successMessage.style.display = 'none';
        if (paymentForm) paymentForm.reset();
        if (cardErrors) cardErrors.textContent = '';
        
        // Limpar elemento do cartão
        if (cardElement) {
            try {
                cardElement.clear();
            } catch (error) {
                console.log('Erro ao limpar card element:', error);
            }
        }
        
        AppState.isProcessing = false;
    }

    handleModalClick(event) {
        if (event.target === event.currentTarget) {
            this.closeModal();
        }
    }

    handleCardChange(event) {
        const displayError = document.getElementById('card-errors');
        if (displayError) {
            displayError.textContent = event.error ? event.error.message : '';
        }
    }

    async handlePaymentSubmit(event) {
        event.preventDefault();
        
        if (AppState.isProcessing) return;

        const isValid = this.validateForm();
        if (!isValid) return;

        AppState.isProcessing = true;
        this.setLoadingState(true);

        try {
            const formData = this.collectFormData();
            
            // Verificar se o cardElement está disponível
            if (!cardElement) {
                this.showError('Erro: Elemento do cartão não inicializado. Tente fechar e abrir o modal novamente.');
                return;
            }

            const { token, error } = await stripe.createToken(cardElement);

            if (error) {
                this.showError(error.message);
            } else {
                await this.processPayment(formData, token);
                this.showSuccess();
                this.trackConversion(formData);
            }
        } catch (error) {
            console.error('Erro no processamento:', error);
            this.showError('Ocorreu um erro inesperado. Tente novamente.');
        } finally {
            this.setLoadingState(false);
            AppState.isProcessing = false;
        }
    }

    validateForm() {
        const requiredFields = ['name', 'email', 'company'];
        let isValid = true;
        
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && !field.value.trim()) {
                field.style.borderColor = 'var(--error-red)';
                isValid = false;
            } else if (field) {
                field.style.borderColor = 'var(--border-gray)';
            }
        });
        
        if (!isValid) {
            this.showError('Por favor, preencha todos os campos obrigatórios.');
        }
        
        return isValid;
    }

    collectFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            plan: AppState.selectedPlan,
            price: AppState.selectedPrice
        };
    }

    async processPayment(formData, token) {
        try {
            const apiUrl = getConfig('api.baseUrl');
            const endpoint = getConfig('api.endpoints.createSubscription');
            
            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token.id,
                    email: formData.email,
                    name: formData.name,
                    company: formData.company,
                    plan: formData.plan
                })
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Erro no processamento');
            }

            return result;
        } catch (error) {
            console.error('Erro no processamento do pagamento:', error);
            throw error;
        }
    }

    setLoadingState(isLoading) {
        const submitButton = document.getElementById('submit-payment');
        const buttonText = submitButton?.querySelector('.button-text');
        
        if (submitButton && buttonText) {
            submitButton.disabled = isLoading;
            buttonText.textContent = isLoading ? 'Processando...' : 'Iniciar Teste Grátis';
        }
    }

    showError(message) {
        const cardErrors = document.getElementById('card-errors');
        if (cardErrors) {
            cardErrors.textContent = message;
        }
    }

    showSuccess() {
        const checkoutForm = document.getElementById('checkout-form');
        const successMessage = document.getElementById('success-message');
        
        if (checkoutForm) checkoutForm.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';
    }

    handleSmoothScroll(event) {
        event.preventDefault();
        const target = document.querySelector(event.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    trackConversion(formData) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'purchase', {
                currency: 'BRL',
                value: parseFloat(formData.price),
                items: [{
                    item_id: formData.plan,
                    item_name: `Plano ${this.capitalizeFirst(formData.plan)}`,
                    category: 'Subscription',
                    quantity: 1,
                    price: parseFloat(formData.price)
                }]
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Purchase', {
                value: parseFloat(formData.price),
                currency: 'BRL'
            });
        }
        
        console.log('Conversão rastreada:', formData);
    }

    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

// Utilitários globais
const Utils = {
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    },

    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Funções globais para compatibilidade
window.closeModal = function() {
    if (window.striviumApp) {
        window.striviumApp.closeModal();
    }
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    window.striviumApp = new StriviumApp();
    
    // Performance monitoring
    const debouncedResize = Utils.debounce(() => {
        console.log('Window resized');
    }, 250);
    
    const throttledScroll = Utils.throttle(() => {
        // Scroll logic here if needed
    }, 16);
    
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('scroll', throttledScroll);
});

// Export para uso global se necessário
window.StriviumApp = StriviumApp;
window.Utils = Utils; 