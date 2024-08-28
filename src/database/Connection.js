import { Sequelize } from '@sequelize/core';
import { MsSqlDialect } from '@sequelize/mssql';
import  dotenv from 'dotenv';
dotenv.config()
const server = process.env.SERVER_DB || 'localhost';
const port = parseInt(process.env.PORT_DB) || 1433;
const databaseName = process.env.NAME_DB || 'DAO_APPWEB';

const userName = process.env.USER_NAME_DB || 'admin';
const userPassword = process.env.USER_PASSWORD_DB || 'admin';

//configuracion de la conexion a la base de datos
const sequelize = new Sequelize({
  dialect: MsSqlDialect,
  server: server,
  port: port,
  database: databaseName,
  encrypt: false,
  trustServerCertificate: true,
  authentication: {
    type: 'default',
  
    options: {
      userName: userName,
      password: userPassword,
      
    },
  },
});
export default sequelize;
