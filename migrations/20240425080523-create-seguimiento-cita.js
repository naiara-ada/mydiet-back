'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SeguimientoCita', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Fecha: {
        type: Sequelize.DATE
      },
      Peso: {
        type: Sequelize.STRING
      },
      Grasa_Corporal: {
        type: Sequelize.STRING
      },
      Perimetro_de_Cadera: {
        type: Sequelize.STRING
      },
      Perimetro_de_Cintura: {
        type: Sequelize.STRING
      },
      Descripcion: {
        type: Sequelize.STRING
      },
      Hora_de_la_Cita: {
        type: Sequelize.TIME
      },
      User_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'Usuarios',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
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
    await queryInterface.dropTable('SeguimientoCita');
  }
};