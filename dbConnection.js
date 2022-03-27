const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(process.env.DB_TABLE, process.env.USER_NAME, process.env.PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    logging: false,
    port: process.env.DB_PORT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

checkConnection()

module.exports = sequelize