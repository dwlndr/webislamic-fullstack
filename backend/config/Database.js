import { Sequelize } from "sequelize";

const db = new Sequelize('islamic_web','root','',{
    host : "localhost",
    dialect : "mysql"
});

export default db;