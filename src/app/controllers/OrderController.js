import * as yup from 'yup';
import OrderSchema from '../Schemas/Order.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

class OrderController {
    // Lógica do controlador de produtos
    async store(req, res) {
        const schema = yup.object({
            products: yup.array().of(
                yup.object({
                    id: yup.number().required(), 
                    quantity: yup.number().required().min(1),
                })
            ).required(),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            console.log(req.userId + ' ' + req.userName);
            return res.status(400).json({ error: err.errors });
        }
        //const { name } = req.body.name;
        const { products } = req.body;
        const productsIds = products.map(product => product.id);

        const findProducts = await Product.findAll({
            where: { id: productsIds },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                },
            ],
        });
        const formattedProducts = findProducts.map(product => {
            const productIndex = products.findIndex((item) => item.id === product.id);
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category.name,
                url: product.url,
                quantity: products[productIndex].quantity,
            };
        });
        //console.log(formattedProducts);
        const newOrder = await OrderSchema.create({
            user: {
                id: req.userId,
                name: req.userName,
            },
            products: formattedProducts,
            status: 'Pedido realizado',
        });
        //console.log(product);
        return res.status(201).json(newOrder);
        //return res.status(201).json({ message: 'Product created successfully' });
    }
    async index(req, res) {
        const orders = await OrderSchema.find();
        return res.json(orders);
    }
    async update(req, res) {
        const schema = yup.object({
            status: yup.string().required(),
        });
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }
        const {admin: isAdmin} = await User.findByPk(req.userId);
        if(!isAdmin){
            return res.status(401).json({error: 'User is not admin'});
        }
        const { id } = req.params;
        const { status } = req.body;

        try{
            await OrderSchema.updateOne({ _id: id }, { status });
        } catch (err) {
            return res.status(400).json({ error: 'Order not found' });
        }
        return res.json({ message: 'Order status updated successfully' });
    }
}
export default new OrderController();
