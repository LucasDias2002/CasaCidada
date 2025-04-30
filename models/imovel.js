const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/conexaoPostgre');

const Imovel = sequelize.define('Imovel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  num_residencia: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nome_proprietario: {
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
  valor_aluguel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  data_inicio_contrato: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  data_termino_contrato: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  tableName: 'imovel',
  timestamps: false
});

module.exports = Imovel;