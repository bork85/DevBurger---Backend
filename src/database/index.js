import pg from 'pg';
import Sequelize from 'sequelize';
import configDatabase from '../config/database.js';
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';
import mongoose from 'mongoose';

const models = [User, Product, Category];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize({ ...configDatabase, dialectModule: pg });
        models.forEach((model) => model.init(this.connection));
        models.forEach((model) => model.associate && model.associate(this.connection.models));
    }

    async mongo() {
        try {
            await mongoose.connect(process.env.MONGO_URL);
            console.log('MongoDB conectado!');
        } catch (err) {
            console.warn('MongoDB não conectado:', err.message);
        }
    }
}
export default new Database();