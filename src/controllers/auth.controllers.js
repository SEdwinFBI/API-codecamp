
import sequelize from "../database/Connection.js";
import { existUser, invalidarEmail } from "../helpers/emailValid.js";
import { tokenSign } from "../helpers/generateToken.js";
import { encrypt, compare } from "../helpers/handelBcrypt.js";



export const login = async (req, res) => {
  const { email, password_user } = req.body;
  try {
    const data = await existUser(email);//validador de emails y todo los datos
    if (!data) {
        return res.status(400).json({"mensaje":"usuario no encontrado"});
      };
    const validacion = await compare(password_user, data[0].password_user);//es valido?

    if (validacion) {
      const tokenSession = await tokenSign(data[0]); //bearer token
      //retornamos el token que va en el request
      return res.status(200).json({
        //cambio ##########
        "data":data[0].fkRol,//datos del usuario. 
        tokenSession
      });

    } else {
     return res.status(404).json({"mensaje":"error contraseña o correo incorrecto"});
    }

  } catch (error) {
   res.status(500).json({"mensaje":"error interno"});
    console.log("error", error);
  }
};
export const register = async (req, res) => {

  const { nombre, email, password_user, telefono, fecha_nacimiento,fkRol } = req.body;
  try {
    if (await invalidarEmail(email)) {
      return res.status(400).json({"mensaje":"correo ya registrado"});
    }; 
    if(fkRol > 2 && fkRol < 1){
      return res.status(400).json({"mensaje":"Rol entre 1 y 2"});
    }

    const hashPassword = await encrypt(password_user);
    const result = await sequelize.query(
      "EXEC nuevo_usuario :nombre, :email, :hashPassword, :telefono, :fecha_nacimiento,:fkRol",
      {
        replacements: {
          nombre,
          email,
          hashPassword,
          telefono,
          fecha_nacimiento,
          fkRol
        },
      }
    );
    res.status(200).json({"mensaje":"registrado con exito!"});
  } catch (error) {
    console.log("error", error);
    res.status(500).json({"mensaje":"error en registro"});
  }
};
