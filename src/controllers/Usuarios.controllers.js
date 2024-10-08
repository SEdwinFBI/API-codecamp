import sequelize from "../database/Connection.js";
import { encrypt } from "../helpers/handelBcrypt.js";
import { invalidarEmail } from "../helpers/emailValid.js";

//obtener usuario
export const getUsuario = async (req, res) => {
  const { idUsuario } = req.params;//obtener los datos de un usuario
  try {
    const [result, metadata] = await sequelize.query(
      "EXEC sp_obtener_usuario :idUsuario",
      {
        replacements: {
          idUsuario,
        },
      }
    );
    if (metadata === 0) {
      return res.status(200).json({ "mensaje": "Usuario no encontrado" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ "mensaje": "error interno" });
    console.error("Error al ejecutar el procedimiento almacenado:", error);
  }
};
//obtener usuarios
export const getUsuarios = async (req, res) => {
  try {
    const [result, metadata] = await sequelize.query(
      "SELECT * FROM view_usuarios"
    );
    if (metadata === 0) {
      return res.status(200).json({ mensaje: "sin respuesta" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ "mensaje": "error interno" });
    console.error("Error al obtener la vista:", error);
  }
};
//actualizar
export const updateUsuario = async (req, res) => {
  const { idUsuario } = req.params;//usuario a actualizar
  const {
    fkRol,
    fkEstado,
    nombre,
    email,
    password_user,
    telefono,
    fecha_nacimiento,
  } = req.body;


  try {
    
    if (await invalidarEmail(email)) {
      return res.status(400).json({"mensaje":"correo ya registrado"});
    };
    const hashPassword = await encrypt(password_user);
    await sequelize.query(
      "EXEC update_usuario :idUsuario, :fkRol, :fkEstado, :nombre, :email,:password_user, :telefono, :fecha_nacimiento",
      {
        replacements: {
          idUsuario,
          fkRol,
          fkEstado,
          nombre,
          email,
          password_user: hashPassword,
          telefono,
          fecha_nacimiento,
        },
      }
    );
    res.status(200).json({ "mensaje": "Actualizado con exito" });
  } catch (error) {
    res.status(500).json({ "mensaje": "Error interno" });
    console.log("error",error)
  }
};
//nuevo usuario
export const setUsuario = async (req, res) => {
  const {
    fkRol,
    fkEstado,
    nombre,
    email,
    password_user,
    telefono,
    fecha_nacimiento,
  } = req.body;
  try {
    if (await invalidarEmail(email)) {
      return res.status(400).json({"mensaje":"correo ya registrado"});
    };
    const hashPassword = await encrypt(password_user);
    await sequelize.query(
      "EXEC crear_usuario :fkRol, :fkEstado, :nombre, :email,:password_user, :telefono, :fecha_nacimiento",
      {
        replacements: {
          fkRol,
          fkEstado,
          nombre,
          email,
          password_user: hashPassword,
          telefono,
          fecha_nacimiento,
        },
      }
    );
    res.status(200).json({ "mensaje": `Usuario: ${nombre} creado con exito` });
  } catch (error) {
    res.status(500).json({ "mensaje": "Error interno" });
    console.log("error",error)
  }
};

