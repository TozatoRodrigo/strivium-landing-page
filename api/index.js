// Arquivo de entrada para Vercel Serverless Functions
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: 'application/webhook' }));

// Configuração dos planos
const PLANS = {
    basico: {
        priceId: process.env.STRIPE_PRICE_BASICO || 'price_1234567890abcdef',
        name: 'Plano Básico',
        amount: 9700,
    },
    profissional: {
        priceId: process.env.STRIPE_PRICE_PROFISSIONAL || 'price_0987654321fedcba',
        name: 'Plano Profissional',
        amount: 19700,
    },
    enterprise: {
        priceId: process.env.STRIPE_PRICE_ENTERPRISE || 'price_1122334455667788',
        name: 'Plano Enterprise',
        amount: 49700,
    }
};

// Rota para criar assinatura
app.post('/api/create-subscription', async (req, res) => {
    try {
        const { token, email, name, company, plan } = req.body;

        if (!token || !email || !name || !plan || !PLANS[plan]) {
            return res.status(400).json({
                success: false,
                error: 'Dados obrigatórios não fornecidos'
            });
        }

        const customer = await stripe.customers.create({
            email: email,
            name: name,
            source: token,
            metadata: {
                company: company || '',
                plan: plan
            }
        });

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

// Webhook do Stripe
app.post('/webhook/stripe', (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'customer.subscription.created':
            console.log('Nova assinatura criada:', event.data.object.id);
            break;
        case 'customer.subscription.deleted':
            console.log('Assinatura cancelada:', event.data.object.id);
            break;
        case 'invoice.payment_succeeded':
            console.log('Pagamento realizado:', event.data.object.id);
            break;
        case 'invoice.payment_failed':
            console.log('Falha no pagamento:', event.data.object.id);
            break;
        default:
            console.log(`Evento não tratado: ${event.type}`);
    }

    res.json({ received: true });
});

// Rota de saúde
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Para Vercel (serverless)
module.exports = app; 