import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET =  process.env.JWT_SECRET ;
const jwt = jsonwebtoken;

export const tokenSign = async(user)=>{//generar token
    return jwt.sign(
        {//carga de propiedades
            idUsuario: user.idUsuario,
            rol: user.fkRol
        },
       JWT_SECRET,//llave/contraseña
        {
            expiresIn:"24h",//tiempo de expiracion
        }
    );
};
export const verifyToken = async(tokenSession)=>{
    try {
        return jwt.verify(tokenSession,JWT_SECRET);// si es valido retornamos la data
    } catch (error) {
        return null;
    }
};