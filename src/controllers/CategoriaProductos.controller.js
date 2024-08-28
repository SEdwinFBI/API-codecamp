import sequelize from "../database/Connection.js";


export const getCategoriaProductos = async(req,res)=>{
    try {
        const result = await sequelize.query('SELECT * FROM view_categoriaProductos');
        res.json(result)
    } catch (error) {
        res.status(500).json({
            "mensaje":"error al obtener la categoria de productos"
        })
        console.log("error",error)
    }
};
export const getCategoriaProducto = async(req,res)=>{
    const idCategoriaProducto = req.params.idCategoriaProducto;
    
    try {
        const result = await sequelize.query('EXEC sp_obtener_categoria_producto :idCategoriaProducto',{
            replacements:{
                idCategoriaProducto
            }
        });
        res.json(result)
    } catch (error) {
        res.status(500).json({
            "mensaje":"error al obtener la categoria de producto"
        })
        console.log("error",error)
    }
};

export const setCategoriaProducto = async(req,res)=>{
    const {fkUsuario,nombre,fkEstado}= req.body;
    
    try {
        const result = await sequelize.query('EXEC nuevo_cat_productos :fkUsuario, :nombre, :fkEstado',{
            replacements:{
                fkUsuario,
                nombre,
                fkEstado
            }
        });
        res.status(200).json({
            "mensaje":"Nueva categoria creada"
        });
    } catch (error) {
        res.status(500).json({
            "mensaje":"error al crear la categoria de producto"
        })
        console.log("error",error)
    }
};
export const updateCategoriaProducto = async(req,res)=>{
    const idCategoriaProducto = req.params.idCategoriaProducto;
    const {fkUsuario,nombre,fkEstado}= req.body;
    
    try {
        const [result,metadata ]= await sequelize.query('EXEC update_cat_productos :idCategoriaProducto, :fkUsuario, :nombre, :fkEstado',{
            replacements:{
                idCategoriaProducto,
                fkUsuario,
                nombre,
                fkEstado
            }
        });
        res.status(200).json({
            "mensaje":"se actualizo la categoria"+metadata
        });
    } catch (error) {
        res.status(500).json({
            "mensaje":"error al actualizar la categoria de producto"
        })
        console.log("error",error)
    }
};

