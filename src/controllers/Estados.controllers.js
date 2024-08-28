import sequelize from "../database/Connection.js";

export const getEstados = async(req,res)=>{
  try {
    const result = await sequelize.query('SELECT * FROM view_estados');
    return res.json(result);
  } catch (error) {
    res.status(500).json({
      "mensaje":"no se pudo obtener los Estados"
    });
    console.log("error",error);
  };
};

export const getEstado = async(req,res)=>{
  const idEstado = req.params.idEstado;
  try {
    const result = await sequelize.query('EXEC sp_obtener_estado :idEstado',{
      replacements:{
        idEstado,
      }
    });
    res.json(result);
  } catch (error) {
    console.log("error",error)
  }
};

export const updateEstado = async(req,res)=>{
  const idEstado = req.params.idEstado;
  const {nombre} = req.body;
  try {
    const result = await sequelize.query('EXEC update_estados :idEstado, :nombre',{
      replacements:{
        idEstado,
        nombre
      }
    });
    res.status(200).json({
      "mensaje":"actualizado con exito"
    });
  } catch (error) {
    res.status(500).json(
      {
        "mensaje":"Error al actualizar"
      }
    );
    console.log("error",error);
  }
};

export const setEstado = async(req,res)=>{
  const {nombre} = req.body;

  try {
    const result = await sequelize.query('EXEC nuevo_estado :nombre',
      {replacements:{
          nombre
        }}
    );
    res.status(200).json({
      "mensaje":"Guardado con exito"
    });

  } catch (error) {
    res.status(500).json({
      "mensaje":"Error al guardar nuevo estado"
    });
    console.log("error",error);
  };
};


