// Configurações da aplicação Strivium
const StriviumConfig = {
    // Configurações do Stripe
    stripe: {
        publicKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx', // Chave pública de teste
        currency: 'brl',
        country: 'BR'
    },
    
    // Configurações de debug
    debug: {
        enabled: true,
        logLevel: 'info' // 'error', 'warn', 'info', 'debug'
    },
    
    // Configurações da empresa
    company: {
        name: 'Strivium',
        email: 'contato@strivium.com.br',
        phone: '(11) 9999-9999',
        website: 'https://strivium.com.br'
    },
    
    // Configurações dos planos
    plans: {
        basico: {
            name: 'Básico',
            price: 97,
            currency: 'BRL',
            interval: 'month',
            trialDays: 7,
            features: [
                'Até 5 usuários',
                'Comunicação em tempo real',
                'Prontuário digital básico',
                'Suporte por email'
            ]
        },
        profissional: {
            name: 'Profissional',
            price: 197,
            currency: 'BRL',
            interval: 'month',
            trialDays: 7,
            features: [
                'Até 20 usuários',
                'Todas as funcionalidades básicas',
                'Integração com sistemas',
                'Relatórios avançados',
                'Suporte prioritário 24/7'
            ]
        },
        enterprise: {
            name: 'Enterprise',
            price: 497,
            currency: 'BRL',
            interval: 'month',
            trialDays: 7,
            features: [
                'Usuários ilimitados',
                'Todas as funcionalidades Pro',
                'API personalizada',
                'Treinamento dedicado',
                'Gerente de sucesso dedicado'
            ]
        }
    },
    
    // Configurações de analytics
    analytics: {
        googleAnalytics: {
            enabled: false,
            trackingId: 'GA_MEASUREMENT_ID'
        },
        facebookPixel: {
            enabled: false,
            pixelId: 'YOUR_PIXEL_ID'
        }
    },
    
    // URLs da API
    api: {
        baseUrl: process.env.NODE_ENV === 'production' 
            ? '' // Usar URL relativa no Vercel
            : 'http://localhost:3001', // Backend local para desenvolvimento
        endpoints: {
            createSubscription: '/api/create-subscription',
            cancelSubscription: '/api/cancel-subscription',
            getSubscription: '/api/subscription',
            webhook: '/webhook/stripe'
        }
    },
    
    // Configurações de UI
    ui: {
        animationDuration: 300,
        toastDuration: 5000,
        modalTransition: 'ease-in-out'
    }
};

// Função para obter configuração
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj && obj[key], StriviumConfig);
}

// Função para definir configuração
function setConfig(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => obj[key] = obj[key] || {}, StriviumConfig);
    target[lastKey] = value;
}

// Exportar para uso global
window.StriviumConfig = StriviumConfig;
window.getConfig = getConfig;
window.setConfig = setConfig; 