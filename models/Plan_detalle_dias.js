'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan_Detalle_Dias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plan_Detalle_Dias.init({
    Plan_id: DataTypes.INTEGER,
    Dias_id: DataTypes.INTEGER,
    Dia_Semana: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Plan_Detalle_Dias',
  });
  return Plan_Detalle_Dias;
};