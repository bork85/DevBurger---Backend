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

    async init() {
    this.connection = new Sequelize(configDatabase);
    models.forEach((model) => model.init(this.connection));
    models.forEach((model) => model.associate && model.associate(this.connection.models));

    try {
        await this.connection.authenticate();
        console.log('PostgreSQL conectado!');
    } catch (err) {
        console.error('Erro ao conectar no PostgreSQL:', err.message);
    }
}


    async mongo() {
        try {
            this.mongoConnection = await mongoose.connect('mongodb://localhost:27017/devburger');
            console.log('MongoDB conectado!');
        } catch (err) {
            console.warn('MongoDB não conectado (opcional):', err.message);
        }
    }
}
export default new Database();