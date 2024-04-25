'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cenas extends Model {
    
    static associate(models) {
      // define association here
      Cenas.hasMany(models.Dias,{foreignKey:'Cena_id'})
    }
  }
  Cenas.init({
    Titulo: DataTypes.STRING,
    Ingredientes: DataTypes.STRING,
    Preparacion: DataTypes.STRING,
    Dias_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cenas',
  });
  return Cenas;
};