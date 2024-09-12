import sequelize from "../database/Connection.js";
import { verifyToken } from "../helpers/generateToken.js";

export const validToken = async (req, res, next) => {
    try {
        const tokenSession = req.headers.authorization;//obtenemos el encabezado: bearer y token
        if (!tokenSession) {
            return res.status(401).json({"mensaje":"sin autorizacion toekn"});//si no existe el encabezado
        }
        const token = tokenSession.split(' ')[1]; //token
        const tokenData = await verifyToken(token); // verifica el token y devuelve id,rol,iat,exp
        if (!tokenData) {
            return res.status(401).json({"mensaje":"token invalido u expirado"});
        }

        req.userData = tokenData; // le pasamos la data para seguir con el flujo
        //luego accedemos a el usando el mismo
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({"mensaje":"no se pudo autorizar"});
    }
};


export const authRol = (rolRoute)=>async(req,res,next)=>{//roles
    try {
        const {idUsuario} =req.userData;//extraemos el idUsuario
        const [nombre, metadata] = await sequelize.query( "EXEC sp_obtener_rol :idUsuario",{
              replacements: {
                idUsuario:idUsuario
              }});//obtenemos el rol
          if ([].concat(rolRoute).includes(nombre[0].rol)) {//validamos si tiene el rol esperado
            next();//seguimos el flujo
          } else {
            res.status(409).json({"mensaje":"Nececitas permisos elevado"})
          }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "mensaje": "Error en la autorización" });
    }
}