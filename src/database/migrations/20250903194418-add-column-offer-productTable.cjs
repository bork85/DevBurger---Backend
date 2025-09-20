'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn('products', 'offer', {
      type: 'BOOLEAN',
      defaultValue: false,
      allowNull: false,
    }); 
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('products', 'offer');
  }
};
