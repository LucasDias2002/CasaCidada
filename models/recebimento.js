const { sequelize } = require("../database/conexaoPostgre");
const { DataTypes } = require('sequelize');

const Recebimento = sequelize.define('Recebimentos', {
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
    data_recebimento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sigla_doador: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'recebimentos',
    timestamps: false
  });

module.exports = Recebimento;