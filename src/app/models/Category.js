import Sequelize, { Model } from 'sequelize';

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3001/category-files/${this.path}`;
                    },
                }
            },
            {
                sequelize,
                tableName: 'categories',
                timestamps: true,
                createdAt: 'created_at', // mapeia para snake_case
                updatedAt: 'updated_at', // mapeia para snake_case
            },
        );
        return this;
    }
    static associate(models) {
        this.hasMany(models.Product, {
            foreignKey: 'category_id',
            as: 'products'
        });
    }
}
export default Category;