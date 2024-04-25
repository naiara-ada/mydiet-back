'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    
    static associate(models) {
      // define association here
      Usuarios.hasMany(models.SeguimientoCita,{foreignKey:'User_id'})
      Usuarios.hasMany(models.Plan,{foreignKey:'User_id'})
    }
  }
  Usuarios.init({
    Nombre: DataTypes.STRING,
    Apellido: DataTypes.STRING,
    Contraseña: DataTypes.STRING,
    Rol_Usuario: DataTypes.STRING,
    Correo: DataTypes.STRING,
    Fecha_Registro: DataTypes.DATE,
    User_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};