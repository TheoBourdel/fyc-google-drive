const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432 ,
    database: "fyc",
    username: "root",
    password: "password",
    timestamps:false
});

module.exports = sequelize;