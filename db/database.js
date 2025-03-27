const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});


/**
 * Conecta-se com o banco de dados.
 * Exibe uma mensagem de falha ou sucesso na conexão.
 * @returns {Promisse<void>}
 */
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Conexão bem sucedida")
    } catch (e) {
        console.log("Falha na conexão com o Banco de dados.")
        console.error(e.message);
        closeConection();
    }
}

/**
 * Fecha conexão com o banco de dados.
 * Exibe uma mensagem de sucesso ou falha ao fechar a conexão.
 * @returns {Promisse<void>}
 */

async function closeConection() {
    try {
        await sequelize.close();
        console.log("Conexão fechada com sucesso!");
    } catch (e) {
        console.log("Falha ao fechar conexão com o banco de dados");
        console.error(e.message);
    }
}

module.exports = { sequelize, connectDB };