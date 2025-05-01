const { sequelize } = require("../database/conexaoPostgre");
const { DataTypes } = require('sequelize');

const Usuario = sequelize.define('Usuario', {
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
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  data_nasc: {
    type: DataTypes.DATE,
  },
  permissao: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
        notEmpty: true
      }
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;