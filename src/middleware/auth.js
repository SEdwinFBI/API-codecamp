import sequelize from "../database/Connection.js";
import { verifyToken } from "../helpers/generateToken.js";

// Asegúrate de tener importada la función verifyToken

export const validToken = async (req, res, next) => {
    try {
        const tokenSession = req.headers.authorization;//obtenemos el encabezado
        console.log(tokenSession)
        if (!tokenSession) {
            return res.status(401).json({"mensaje":"sin autorizacion"});//si no existe el encabezado
        }
        const token = tokenSession.split(' ')[1]; // extraemos el encabezado y el objeto 2
        const tokenData = await verifyToken(token); // verificamos el token
        console.log(tokenData);

        if (!tokenData) {
            return res.status(401).json({"mensaje":"token invalido"});
        }

        req.userData = tokenData; // le pasamos la data para seguir con el flujo
        //luego accedemos a el usando el mismo
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({"mensaje":"no se pudo autorizar"});
    }
};


export const authRol = (rol)=>async(req,res,next)=>{
    try {
        const {idUsuario} =req.userData;//extraemos el idUsuario
        const [userData, metadata] = await sequelize.query( "EXEC sp_obtener_usuario :idUsuario",{
              replacements: {
                idUsuario,
              }});//obtenemos el usuario
          console.log(userData[0])
          
          if ([].concat(rol).includes(userData[0].rol)) {//validamos si tiene los permisos
         
            next();//seguimos el flujo
          } else {
            res.status(409).json({"mensaje":"Nececitas permisos elevado"})
          }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "mensaje": "Error en la autorización" });
    }
}