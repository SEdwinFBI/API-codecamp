import sequelize from "../database/Connection.js";


//Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    let response = await sequelize.query("SELECT * FROM view_productos_editable ");
    
  const view_productos =response[0].map((r)=>{//tranformacion de ruta para servir la foto
    return{
      ...r,
      foto: `${req.protocol}://${req.get('host')}${r.foto}`
    }
  })

    res.status(200).json(view_productos);

  } catch (error) {
    res.status(500).json({mensaje:"error interno"})
    console.error("Error al ejecutar la vista view_productos:", error);
  }
};
//Obtener un Producto segun Id
export const getProduct = async (req, res) => {
  const idProducto = parseInt(req.params.idProducto);

  try {
    const [data, metadata] = await sequelize.query(
      "EXEC sp_obtener_producto :idProducto",
      {
        replacements: { idProducto },
      }
    );
    //vista del producto
    const view_producto =data.map((r)=>{
      return{
        ...r,
        foto: `${req.protocol}://${req.get('host')}${r.foto}`//concatenacion de rutas
      }
    })
    res.status(200).json(view_producto);
  } catch (error) {
    res.status(500).json({mensaje:"error interno"})
    console.log("Error al ejecutar sp_obtener_producto", error);
  }
};
//Guardar proucto
export const setProduct = async (req, res) => {


  
  const {idUsuario }= req.userData;
  const {
    fkCategoriaProducto,
    nombre,
    marca,
    codigo,
    stock,
    fkEstado,
    precio,
//foto
  } = req.body;
console.log(req.body)

  try {
    //concatenacion para el guardado de foto
    //http
    //localhost
    //nombre archivo
    //${req.protocol}://${req.get('host')}
    const rutaFoto =`/uploads/products/${req.file.filename}`;

    const [result, metadata] = await sequelize.query(
      "EXEC nuevo_producto :fkCategoriaProducto, :fkUsuario, :nombre, :marca, :codigo, :stock, :fkEstado, :precio, :foto",
      {
        replacements: {
          fkCategoriaProducto: parseInt(fkCategoriaProducto),
          fkUsuario: parseInt(idUsuario),
          nombre,
          marca,
          codigo,
          stock: parseInt(stock),
          fkEstado: parseInt(fkEstado),
          precio: parseFloat(precio),
          foto:rutaFoto ,
        },
      }
    );
    res.status(200).json({mensaje:"Guardado con éxito"});
    console.log("Producto guardado con éxito:", metadata);
  } catch (error) {
    console.error("Error al guardar el producto sp:nuevo_producto :", error);
    res.status(500).json({mensaje:"Error al guardar el producto"});
  }

};

export const updateProduct = async (req, res) => {
  const {idUsuario }= req.userData
  const idProducto = req.params.idProducto;
  const {
    fkCategoriaProducto,
    nombre,
    marca,
    codigo,
    stock,
    fkEstado,
    precio,

  } = req.body;
  try {
    //${req.protocol}://${req.get('host')}
  
    const rutaFoto = req.file && req.file.filename ? `/uploads/products/${req.file.filename}` : null;
    const result = await sequelize.query(
      "EXEC update_productos :idProducto,:fkCategoriaProducto, :fkUsuario, :nombre, :marca, :codigo, :stock, :fkEstado, :precio, :foto",
      {
        replacements: {
          idProducto: parseInt(idProducto),
          fkCategoriaProducto: parseInt(fkCategoriaProducto),
          fkUsuario: parseInt(idUsuario),
          nombre,
          marca,
          codigo,
          stock: parseInt(stock),
          fkEstado: parseInt(fkEstado),
          precio: parseFloat(precio),
          foto: rutaFoto || null
        },
      }
    );
    res.status(200).json({mensaje:"Actualizado con exito"});
    console.log("producto:", idProducto, "actualizado con exito");
  } catch (error) {
    console.error("Error  actualizar producto sp:update_productos :", error);
    res.status(500).json({mensaje:"Error al actualizar producto"});
  }
};
