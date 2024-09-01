import sequelize from "../database/Connection.js";


//Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const response = await sequelize.query("SELECT * FROM view_productos");
    res.status(200).json(response);

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
    res.status(200).json(data);
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

  if (
    !fkCategoriaProducto ||

    !nombre ||
    !marca ||
    !codigo ||
    !stock ||
    !fkEstado ||
    !precio ||
    !req.file
  ) {
    return res.status(400).send("Todos los campos son obligatorios");
  }
console.log(req.file)
  try {
    //concatenacion para el guardado de foto
    //http
    //localhost
    //nombre archivo
    const rutaFoto =`${req.protocol}://${req.get('host')}/uploads/products/${req.file.filename}`;

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
          foto:rutaFoto,
        },
      }
    );
    res.status(200).send("Guardado con éxito");
    console.log("Producto guardado con éxito:", metadata);
  } catch (error) {
    console.error("Error al guardar el producto sp:nuevo_producto :", error);
    res.status(500).send("Error al guardar el producto");
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
    const rutaFoto =`${req.protocol}://${req.get('host')}/uploads/products/${req.file.filename}`;
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
          foto: rutaFoto
        },
      }
    );
    res.status(200).send("Actualizado con exito");
    console.log("producto:", idProducto, "actualizado con exito");
  } catch (error) {
    console.error("Error  actualizar producto sp:update_productos :", error);
    res.status(500).send("Error al actualizar producto");
  }
};
