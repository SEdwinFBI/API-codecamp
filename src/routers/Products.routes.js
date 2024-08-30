import { Router } from "express";
import {getProducts, getProduct, setProduct, updateProduct} from "../controllers/Products.controllers.js";
import { authRol, validToken } from "../middleware/auth.js";
import { client, restricted } from "../helpers/envRol.js";

const router = Router();



router.get('/productos',validToken,authRol([client, restricted]),getProducts)

router.get('/productos/:idProducto',validToken,authRol([client, restricted]),getProduct)

router.post('/productos',validToken,authRol([restricted]),setProduct)

router.put('/productos/:idProducto',validToken,authRol([restricted]),updateProduct)

export default router;

