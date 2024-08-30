import sequelize from "../database/Connection.js";

export const crearOrdenConDetalles = async (req, res) => {
  const {idUsuario }= req.userData
  const {

    nombre,
    direccion,
    telefono,
    email,
    fecha_entrega,
    total,
    detalles,
  } = req.body;

  try {
    // transaction para que no haya errores
    //auto rollback
    await sequelize.transaction(async (transaction) => {
      // el sp devuelve la id de la orden para usarlo en los detalles
      const [result] = await sequelize.query(
        "EXEC nueva_orden :fkUsuario, :nombre, :direccion, :telefono, :email, :fecha_entrega, :total",
        {
          replacements: {
            fkUsuario:idUsuario,
            nombre,
            direccion,
            telefono,
            email,
            fecha_entrega,
            total,
          },
          transaction, //para que esten en el mismo contexto
        }
      );
      const idOrden = result[0].idOrden; //obtenemos la id
      // insertamos los detalles
      //espera un arreglo[{},{}]
      for (const detalle of detalles) {
        const { fkProducto, cantidad } = detalle;

        await sequelize.query(
          "EXEC nuevo_detalle_producto :fkOrden, :fkProducto, :cantidad",
          {
            replacements: { fkOrden: idOrden, fkProducto, cantidad },
            transaction, //mismo contexto
          }
        );
      }

      //sp para calcular el total de orden para proteger el pedido
      const [totalBDResult] = await sequelize.query(
        "EXEC calcular_total_orden :fkOrden",
        {
          replacements: { fkOrden: idOrden },
          transaction, //mismo contexto, si alguno falla lanza el error y se hace el rollback
        }
      );

      const totalBD = totalBDResult[0].totalOrden;
      console.log(totalBD)
      
      // comparo ambos
      if (total !== totalBD) {
        throw new Error("El total no coincide");
        
      }

      // Si todo sale bien
      res.status(201).json({ mensaje: "Gracias por su compra" });
    });
  } catch (error) {
    console.error("Error al manejar la transacción:", error);
    res.status(500).json({ mensaje: "Error al crear la orden con detalles." });
  }
};

export const getOrdenes = async (req, res) => {
  try {
    const result = await sequelize.query("SELECT * FROM view_ordenes");

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      mensaje: "not fouf",
    });
    console.log(error);
  }
};
export const getOrden = async (req, res) => {
  const idOrden = req.params.idOrden;
  try {
    const [result, metadata] = await sequelize.query(
      "Exec sp_obtener_orden :idOrden",
      {
        replacements: {
          idOrden,
        },
      }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      mensaje: "no encontrado",
    });
    console.log(error);
  }
};
export const getOrdenDetalles = async (req, res) => {
    const idOrden = req.params.idOrden;
    try {
      const [result, metadata] = await sequelize.query(
        "Exec sp_obtener_detalles_orden :fkOrden",
        {
          replacements: {
            fkOrden:idOrden,
          },
        }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        mensaje: "no encontrado",
      });
      console.log(error);
    }
  };
export const updateOrden = async (req, res) => {
  const {idUsuario }= req.userData   //usuario    quien confirma, entrga o rechaza el pedidio,
  try {
    const idOrden = req.params.idOrden;
    const {
     //usuario    quien confirma, entrga o rechaza el pedidio,
      fkUsuario,//usuario quien realizo el pedido
      fkEstado,//estado que cambiara
      nombre,//nombre del cliente de destino
      direccion,//direccion del cliente de destino
      telefono,//telefono del destiono 
      email,//correo de confiramcion
      fecha_entrega,//fecha
      total,//total que se mantendra
    } = req.body;

    const result = await sequelize.query('EXEC update_orden :idUsuario, :idOrden, :fkUsuario, :fkEstado,:nombre,:direccion,:telefono,:email,:fecha_entrega,:total',
        {
            replacements:{
              idUsuario:parseInt(idUsuario),
                idOrden:parseInt(idOrden),
                fkUsuario,
                fkEstado,
                nombre,
                direccion,
                telefono,
                email,
                fecha_entrega,
                total}
        }
    );
    res.status(200).json({
        mensaje:"actualizado con exito"
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({

        mensaje:"error interno"
    });
  }
};
export const getHistorial = async (req, res) => {
  
  const {idUsuario }= req.userData   //el id del usuario quien ve su historial, 
   
    
    try {
      const result = await sequelize.query("SELECT * FROM view_ordenes where fkUsuario =:fkUsuario",{
        replacements:{fkUsuario:idUsuario}
      });
  
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        mensaje: "not fouf",
      });
      console.log(error);
    }
  };
