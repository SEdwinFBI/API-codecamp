import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS) ;
//funciones para encriptar y desencriptar
export const encrypt = async(texto)=> await bcrypt.hash(texto,saltRounds);
export const compare = async(passwordNormal,hashPassword)=> await bcrypt.compare(passwordNormal,hashPassword);






