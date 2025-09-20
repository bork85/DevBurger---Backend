import Sequelize, { Model } from 'sequelize';
import Category from './Category.js';

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                price: Sequelize.FLOAT,
                offer: { type: Sequelize.BOOLEAN, defaultValue: false },
                path: Sequelize.STRING,
                category_id: Sequelize.INTEGER,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3001/product-files/${this.path}`;
                    },
                }
            },
            {
                sequelize,
                tableName: 'products',
                timestamps: true,
                createdAt: 'created_at', // mapeia para snake_case
                updatedAt: 'updated_at', // mapeia para snake_case
            },
        );
        return this;
    }
    // associação com Category
    static associate(models) {
        this.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category'
        });
    }
}
export default Product;