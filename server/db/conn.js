import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432 ,
    database: "CuisineConnect",
    username: "root",
    password: "password",
    timestamps:false
});

export default sequelize;