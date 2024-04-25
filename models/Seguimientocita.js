'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SeguimientoCita extends Model {
   
    static associate(models) {
      // define association here
      SeguimientoCita.belongsTo(models.Usuarios,{foreignKey:'User_id'})
    }
  }
  SeguimientoCita.init({
    Fecha: DataTypes.DATE,
    Peso: DataTypes.STRING,
    Grasa_Corporal: DataTypes.STRING,
    Perimetro_de_Cadera: DataTypes.STRING,
    Perimetro_de_Cintura: DataTypes.STRING,
    Descripcion: DataTypes.STRING,
    Hora_de_la_Cita: DataTypes.TIME,
    User_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SeguimientoCita',
  });
  return SeguimientoCita;
};