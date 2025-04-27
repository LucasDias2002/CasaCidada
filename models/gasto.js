const { sequelize } = require("../database/conexaoPostgre");
const { DataTypes } = require('sequelize');

const Gasto = sequelize.define('Gasto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    data_gasto: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'gastos',
    timestamps: false
  });

module.exports = Gasto;