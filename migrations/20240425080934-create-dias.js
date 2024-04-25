'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Fecha: {
        type: Sequelize.DATE
      },
      Dias_id: {
        type: Sequelize.INTEGER
      },
      Desayuno_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'Desayunos',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      Comida_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'Comidas',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      Cena_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'Cenas',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      Plan_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Dias');
  }
};