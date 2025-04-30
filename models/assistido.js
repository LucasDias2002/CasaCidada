const { sequelize } = require("../database/conexaoPostgre");
const { DataTypes } = require('sequelize');

const Assistido = sequelize.define('Assistido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  data_nasc: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  data_cadastro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  id_imovel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'assistido',
  timestamps: false
});

module.exports = Assistido;