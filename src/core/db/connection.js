const { Sequelize } = require('sequelize');

const connectionDB = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

const testConnection = async () => {
    try {
        await connectionDB.authenticate();
        console.log('Banco conectado');
    } catch (error) {
        console.log(`Incapaz de conectar ao banco de dados: ${error}`);
    }
}


module.exports = {connectionDB, testConnection}