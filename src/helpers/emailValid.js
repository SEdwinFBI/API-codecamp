import sequelize from "../database/Connection.js";


export const invalidarEmail = async(email)=>{
    const[data,metadata] = await sequelize.query("EXEC sp_buscar_usuario :email", {
        replacements: {
          email,
        },
      });
      if (data.length > 0 ) {
        return true //hay 1 correo utilizando, entonces el correo no es valido
      }else{
        return false//no hay correo registrado
      }; 
}

export const existUser = async(email)=>{
  const[data,metadata] = await sequelize.query("EXEC sp_buscar_usuario :email", {
      replacements: {
        email,
      },
    });
    if (!data || data.length === 0 || !data[0].password_user) {
      return null //no es valido
    }else{
      return data// es valido
    }; 
}
