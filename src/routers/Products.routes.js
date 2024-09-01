import { Router } from "express";
import {getProducts, getProduct, setProduct, updateProduct} from "../controllers/Products.controllers.js";
import { authRol, validToken } from "../middleware/auth.js";
import { client, restricted } from "../helpers/envRol.js";
import { uploads } from "../middleware/multer.js";
import { getPhotoProduct} from "../controllers/files.controllers.js";

const router = Router();
//para obtener la foto del producto
router.get('/uploads/products/:filename',validToken,authRol([client, restricted]), getPhotoProduct);

router.get('/productos',validToken,authRol([client, restricted]),getProducts)

router.get('/productos/:idProducto',validToken,authRol([client, restricted]),getProduct)

router.post('/productos',validToken,authRol([restricted]),uploads.single('foto'),setProduct)

router.put('/productos/:idProducto',validToken,authRol([restricted]),uploads.single('foto'),updateProduct)

export default router;

