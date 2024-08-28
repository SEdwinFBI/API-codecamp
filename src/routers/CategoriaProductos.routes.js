import { Router } from "express";
import { getCategoriaProducto, getCategoriaProductos, setCategoriaProducto, updateCategoriaProducto } from "../controllers/CategoriaProductos.controller.js";
import { authRol, validToken } from "../middleware/auth.js";



const router = Router();
router.get('/categoria-productos',validToken,authRol(['Usuario','Administrador']),getCategoriaProductos);
router.get('/categoria-productos/:idCategoriaProducto',validToken,authRol(['Usuario','Administrador']),getCategoriaProducto);
router.post('/categoria-productos',validToken,authRol(['Administrador']),setCategoriaProducto);
router.put('/categoria-productos/:idCategoriaProducto',validToken,authRol(['Administrador']),updateCategoriaProducto);


export default router;