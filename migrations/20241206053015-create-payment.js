'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id_pa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prestamo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Prestamos',
          key: 'id_p'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      monto: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      fecha_pago: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      metodo_pago: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};