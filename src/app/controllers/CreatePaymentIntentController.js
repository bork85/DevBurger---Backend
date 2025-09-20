import * as yup from 'yup';
import Stripe from 'stripe';
import 'dotenv/config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// rotina para calcular valor total do pedido
const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        return current.price * current.quantity + acc;
    }, 0);
    return total;
}

class CreatePaymentIntentController {
    async store(req, res) {
        const schema = yup.object({
            products: yup.array().of(yup.object({
                id: yup.number().required(),
                quantity: yup.number().required().min(1),
                price: yup.number().required().min(1),
            })
            ).required(),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            //console.log(req)
            return res.status(400).json({ error: err.errors });
        }
        // Calcula valor total do pedido
        const amount = calculateOrderAmount(req.body.products);
        //console.log(amount);
        // Cria paymentIntent com o valor do pedido e a moeda
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'brl',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        })
    }
}
export default new CreatePaymentIntentController();
