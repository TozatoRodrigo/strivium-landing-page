const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/webhook' }));

// Configuração dos planos
const PLANS = {
    basico: {
        priceId: 'price_1234567890abcdef', // Substitua pelo ID real
        name: 'Plano Básico',
        amount: 9700, // R$ 97,00 em centavos
    },
    profissional: {
        priceId: 'price_0987654321fedcba', // Substitua pelo ID real
        name: 'Plano Profissional',
        amount: 19700, // R$ 197,00 em centavos
    },
    enterprise: {
        priceId: 'price_1122334455667788', // Substitua pelo ID real
        name: 'Plano Enterprise',
        amount: 49700, // R$ 497,00 em centavos
    }
};

// Rota para criar assinatura
app.post('/api/create-subscription', async (req, res) => {
    try {
        const { token, email, name, company, plan } = req.body;

        // Validar dados
        if (!token || !email || !name || !plan || !PLANS[plan]) {
            return res.status(400).json({
                success: false,
                error: 'Dados obrigatórios não fornecidos'
            });
        }

        // Criar cliente no Stripe
        const customer = await stripe.customers.create({
            email: email,
            name: name,
            source: token,
            metadata: {
                company: company || '',
                plan: plan
            }
        });

        // Criar assinatura com período de teste
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: PLANS[plan].priceId }],
            trial_period_days: 7,
            expand: ['latest_invoice.payment_intent'],
            metadata: {
                plan: plan,
                company: company || ''
            }
        });

        // Log da criação
        console.log(`Nova assinatura criada: ${subscription.id} para ${email}`);

        res.json({
            success: true,
            subscription: {
                id: subscription.id,
                customer: customer.id,
                status: subscription.status,
                trial_end: subscription.trial_end,
                current_period_end: subscription.current_period_end
            }
        });

    } catch (error) {
        console.error('Erro ao criar assinatura:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Rota para cancelar assinatura
app.post('/api/cancel-subscription', async (req, res) => {
    try {
        const { subscriptionId } = req.body;

        const subscription = await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true
        });

        res.json({
            success: true,
            subscription: {
                id: subscription.id,
                status: subscription.status,
                cancel_at_period_end: subscription.cancel_at_period_end
            }
        });

    } catch (error) {
        console.error('Erro ao cancelar assinatura:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Webhook do Stripe
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Processar eventos
    switch (event.type) {
        case 'customer.subscription.created':
            console.log('Nova assinatura criada:', event.data.object.id);
            // Enviar email de boas-vindas
            break;

        case 'customer.subscription.deleted':
            console.log('Assinatura cancelada:', event.data.object.id);
            // Desativar acesso do usuário
            break;

        case 'invoice.payment_succeeded':
            console.log('Pagamento realizado:', event.data.object.id);
            // Confirmar acesso do usuário
            break;

        case 'invoice.payment_failed':
            console.log('Falha no pagamento:', event.data.object.id);
            // Notificar usuário sobre falha
            break;

        default:
            console.log(`Evento não tratado: ${event.type}`);
    }

    res.json({ received: true });
});

// Rota para obter informações de assinatura
app.get('/api/subscription/:id', async (req, res) => {
    try {
        const subscription = await stripe.subscriptions.retrieve(req.params.id);
        
        res.json({
            success: true,
            subscription: {
                id: subscription.id,
                status: subscription.status,
                current_period_start: subscription.current_period_start,
                current_period_end: subscription.current_period_end,
                trial_end: subscription.trial_end,
                cancel_at_period_end: subscription.cancel_at_period_end
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Rota de saúde
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Para desenvolvimento local
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`📊 Dashboard: http://localhost:${PORT}/health`);
    });
}

// Para Vercel (serverless)
module.exports = app; 