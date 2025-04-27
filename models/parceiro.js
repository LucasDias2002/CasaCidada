const { DataTypes } = require('sequelize');
const { sequelize } = require("../database/conexaoPostgre");

const Parceiro = sequelize.define('Parceiro', {
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
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        },

    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    area_atuacao: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    }
}, {
    tableName: 'parceiro',
    timestamps: false
});

module.exports = Parceiro;