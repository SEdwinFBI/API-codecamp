import dotenv from "dotenv";
dotenv.config();
//carga de variables de entorno para los roles
//client = Usuario || restricted= Administrador //porl el momenoto  esos son los nombre de roles
export const client = process.env.USER;
export const restricted = process.env.ADMIN;