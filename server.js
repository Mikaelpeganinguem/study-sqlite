//const bodyParser = require('body-parser');
const express = require('express');
const { sequelize, connectDB } = require('./db/database');
const router = require('./route/user.js');
const app = express();

/**
 * Conecta-se com o banco de dados.
 * Exibe uma mensagem de falha ou sucesso na conexão.
 * @returns {Promisse<void>}
 */

(async () => {
    await connectDB();
})();

app.use(express.json());
app.use(router);
//app.use(bodyParser.json());

sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
});