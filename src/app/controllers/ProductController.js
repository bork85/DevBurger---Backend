import * as yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

class ProductController {
    // Lógica do controlador de produtos
    async store(req, res) {
        const schema = yup.object({
            name: yup.string().required(),
            price: yup.number().required(),
            category_id: yup.number().required(),
            offer: yup.boolean(),
        });

        const { admin: isAdmin } = await User.findByPk(req.userId);
        if (!isAdmin) {
            return res.status(401).json({ error: 'User is not admin' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'File is required' });
        }

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { filename: path } = req.file;
        const { name, price, category_id, offer } = req.body;
        //console.log(name, price, category_id, path);

        const product = await Product.create({
            name: name,
            price: price,
            category_id: category_id,
            offer: offer,
            path: path
        });
        //console.log(product);
        return res.status(201).json(product);
        //return res.status(201).json({ message: 'Product created successfully' });
    }
    async index(req, res) {
        const products = await Product.findAll({
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }],
        });
        return res.json(products);
    }
    async update(req, res) {
        const schema = yup.object({
            name: yup.string(),
            price: yup.number(),
            category_id: yup.number(),
            offer: yup.boolean(),
        });

        const { admin: isAdmin } = await User.findByPk(req.userId);
        if (!isAdmin) {
            return res.status(401).json({ error: 'User is not admin' });
        }

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }
        const { id } = req.params;
        const findProduct = await Product.findByPk(id);
        if (!findProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        let path
        if (req.file) {
            path = req.file.filename;
        }

        const { name, price, category_id, offer } = req.body;
        //console.log(name, price, category_id, path);

        await Product.update({
            name: name,
            price: price,
            category_id: category_id,
            offer: offer,
            path: path
        },
            {
                where: {
                    id: id
                }
            }
        );
        //console.log(product);
        return res.status(200).json({ message: 'Product updated successfully' }
        );
    }
}
export default new ProductController();
