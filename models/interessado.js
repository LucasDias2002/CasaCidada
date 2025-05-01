const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/conexaoPostgre');

const Interessado = sequelize.define('Interessado', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  tableName: 'interessados',
  timestamps: false
});

module.exports = Interessado;