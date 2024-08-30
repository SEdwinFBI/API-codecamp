import { Router } from "express";
import { crearOrdenConDetalles, getHistorial, getOrden, getOrdenDetalles, getOrdenes, updateOrden } from "../controllers/DetallesOrden.controllers.js";
import { authRol, validToken } from "../middleware/auth.js";
import { client, restricted } from "../helpers/envRol.js";

const route = Router();

route.get('/orden/historial',validToken,authRol([client,restricted]),getHistorial);
route.get('/orden/detalles/:idOrden',validToken,authRol([client,restricted]),getOrdenDetalles)
route.post('/orden',validToken,authRol([client,restricted]), crearOrdenConDetalles);
route.get('/orden/:idOrden',validToken,authRol([restricted]),getOrden);
route.get('/orden',validToken,authRol([restricted]),getOrdenes);
route.put('/orden/:idOrden',validToken,authRol([restricted]),updateOrden);



export default route;