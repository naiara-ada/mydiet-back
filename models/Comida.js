'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comidas extends Model {
    
    static associate(models) {
      // define association here
      Comidas.hasMany(models.Dias,{foreignKey:'Comida_id'})
    }
  }
  Comidas.init({
    Titulo: DataTypes.STRING,
    Ingredientes: DataTypes.STRING,
    Preparacion: DataTypes.STRING,
    Dias_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comidas',
  });
  return Comidas;
};