const { sequelize } = require("../database/conexaoPostgre");

const findUser = async (email) => {
    try {
        const [results] = await sequelize.query(
            `SELECT * FROM USUARIO WHERE email = $1;`,
            {
                bind: [email],
                type: sequelize.QueryTypes.SELECT
            }
        );

        return results; // já é um objeto com os campos do usuário
    } catch (error) {
        console.log("Erro ao achar usuários por email", error);
        throw error;
    }
}

module.exports = { findUser };
