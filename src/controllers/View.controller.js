import sequelize from "../database/Connection.js";

export const getTopTenProducts = async(req, res)=>{
    try {
        const data = await sequelize.query("Select * from D_top10_productos_vendidos_desc")

        return res.status(200).json(data[0]);
    } catch (error) {
        return res.status(500).json({mensaje:"error al obtener la vista"});
    }
}
export const getTenLeastProducts = async(req, res)=>{
    try {
        const data = await sequelize.query("Select * from D_top10_productos_vendidos_asc")

        return res.status(200).json(data[0]);
    } catch (error) {
        return res.status(500).json({mensaje:"error al obtener la vista"});
    }
}
export const getUltimasVentas = async(req, res)=>{
    try {
        const data = await sequelize.query("SET LANGUAGE Spanish; Select * from view_ultimas_ventas ORDER BY Mes ASC, Dia ASC")

        return res.status(200).json(data[0]);
    } catch (error) {
        return res.status(500).json({mensaje:"error al obtener la vista"});
    }
}