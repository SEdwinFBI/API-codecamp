import { Router } from "express";
import { authRol, validToken } from "../middleware/auth.js";
import { client, restricted } from "../helpers/envRol.js";
import { getTenLeastProducts, getTopTenProducts, getUltimasVentas } from "../controllers/View.controller.js";

const route = Router();

route.get('/view/toptenproducts',validToken,authRol([client,restricted]),getTopTenProducts);
route.get('/view/toptenleastproducts',validToken,authRol([client,restricted]),getTenLeastProducts);
route.get('/view/ultimasventas',validToken,authRol([client,restricted]),getUltimasVentas);




export default route;