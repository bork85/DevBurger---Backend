import * as yup from 'yup';
import Category from '../models/Category.js';
import User from '../models/User.js';

class CategoryController {
    // Lógica do controlador de produtos
    async store(req, res) {
        const schema = yup.object({
            name: yup.string().required(),
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
        const { name } = req.body;

        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists.' });
        }

        const { id } = await Category.create({
            name: name,
            path: path
        });

        return res.status(201).json({ id, name, path });

    }
    async index(req, res) {
        const categories = await Category.findAll({
            attributes: ['id', 'name', 'path', 'url']
        });
        return res.json(categories);
    }
    async update(req, res) {
        console.log(req.params.id);
        const schema = yup.object({
            name: yup.string(),
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

        let path; 
        if (req.file) {
            path = req.file.filename;
        }

        const { name } = req.body;
        if (name) {
            const existingCategory = await Category.findOne({ where: { name } });
            if (existingCategory) {
                return res.status(400).json({ error: 'Category already exists.' });
            }
            const { id } = req.params;
            const categoryExists = await Category.findByPk(id);
            if (!categoryExists) {
                return res.status(400).json({ error: 'Category does not exist.' });
            }
        }
        await Category.update({
            name: name,
            path: path
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({ message: 'Category updated successfully' });

    }
}
export default new CategoryController();
