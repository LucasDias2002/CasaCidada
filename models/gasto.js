const { sequelize } = require("../database/conexaoPostgre");
const { DataTypes } = require('sequelize');


async function ListarUltimo2anos() {
    try {
        const result = await sequelize.query(`SELECT TO_CHAR(g.data_gasto, 'MM-YYYY') AS mes, SUM(g.valor) AS total_gastos FROM gastos g WHERE EXTRACT(YEAR FROM g.data_gasto) >= EXTRACT(YEAR FROM CURRENT_DATE) - 2 GROUP BY TO_CHAR(g.data_gasto, 'MM-YYYY') ORDER BY mes;`);
        return result.rows;
    } catch (error) {
        console.error('Erro ao listar gasto por id - Model:', error);
        throw error;
    }
}




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