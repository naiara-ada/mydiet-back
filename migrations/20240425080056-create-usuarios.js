'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Apellido: {
        type: Sequelize.STRING
      },
      Contraseña: {
        type: Sequelize.STRING
      },
      Rol_Usuario: {
        type: Sequelize.STRING
      },
      Correo: {
        type: Sequelize.STRING
      },
      Fecha_Registro: {
        type: Sequelize.DATE
      },
      User_id: {
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
    await queryInterface.dropTable('Usuarios');
  }
};