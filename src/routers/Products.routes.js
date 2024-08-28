import { Router } from "express";
import {getProducts, getProduct, setProduct, updateProduct} from "../controllers/Products.controllers.js";
import { authRol, validToken } from "../middleware/auth.js";

const router = Router();



router.get('/productos',validToken,authRol(['Usuario','Administrador']),getProducts)

router.get('/productos/:idProducto',validToken,authRol(['Usuario','Administrador']),getProduct)

router.post('/productos',validToken,authRol(['Administrador']),setProduct)

router.put('/productos/:idProducto',validToken,authRol(['Administrador']),updateProduct)

export default router;

