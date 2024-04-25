'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Desayunos extends Model {
   
    static associate(models) {
      // define association here
      Desayunos.hasMany(models.Dias,{foreignKey:'Desayuno_id'})
    }
  }
  Desayunos.init({
    Titulo: DataTypes.STRING,
    Ingredientes: DataTypes.STRING,
    Preparacion: DataTypes.STRING,
    Dias_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Desayunos',
  });
  return Desayunos;
};