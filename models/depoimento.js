const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/conexaoPostgre');

const Depoimento = sequelize.define('Depoimento', {
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
  depoimento: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  tableName: 'depoimentos',
  timestamps: false
});

module.exports = Depoimento;