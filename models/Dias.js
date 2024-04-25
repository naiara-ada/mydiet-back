'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dias extends Model {
    
    static associate(models) {
      // define association here
      Dias.belongsToMany(models.Plan,{through:models.Plan_Detalle_Dias})
      
      Dias.belongsTo(models.Desayunos,{foreignKey:'Desayuno_id'})
      Dias.belongsTo(models.Comidas,{foreignKey:'Comida_id'})
      Dias.belongsTo(models.Cenas,{foreignKey:'Cena_id'})

    }
  }
  Dias.init({
    Nombre: DataTypes.STRING,
    Fecha: DataTypes.DATE,
    Dias_id: DataTypes.INTEGER,
    Desayuno_id: DataTypes.INTEGER,
    Comida_id: DataTypes.INTEGER,
    Cena_id: DataTypes.INTEGER,
    Plan_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dias',
  });
  return Dias;
};