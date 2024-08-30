import { Router } from "express";
import { getCategoriaProducto, getCategoriaProductos, setCategoriaProducto, updateCategoriaProducto } from "../controllers/CategoriaProductos.controller.js";
import { authRol, validToken } from "../middleware/auth.js";
import {client,restricted} from '../helpers/envRol.js';


const router = Router();
router.get('/categoria-productos',validToken,authRol([client,restricted]),getCategoriaProductos);
router.get('/categoria-productos/:idCategoriaProducto',validToken,authRol([client,restricted]),getCategoriaProducto);
router.post('/categoria-productos',validToken,authRol([restricted]),setCategoriaProducto);
router.put('/categoria-productos/:idCategoriaProducto',validToken,authRol([restricted]),updateCategoriaProducto);


export default router;