'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
   
    static associate(models) {
      // define association here
      Plan.belongsTo(models.Usuarios,{foreignKey:'User_id'})
      Plan.belongsToMany(models.Dias,{through:models.Plan_Detalle_Dias})
    }
  }
  Plan.init({
    Fecha: DataTypes.DATE,
    Nombre: DataTypes.STRING,
    Descripcion: DataTypes.STRING,
    User_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};