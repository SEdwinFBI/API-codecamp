import app from "./app.js";
import morgan from "morgan";
import sequelize from "./database/Connection.js";
import dotenv from "dotenv";
dotenv.config()

const port = parseInt(process.env.PORT)||3000;//3000
app.set("port",port);

try {
    await sequelize.authenticate();
    console.log('Conexion a base de datos establecida');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }


app.listen(app.get("port"));

console.log("API codecamp lista, escuchando en el puerto: " + app.get("port"));