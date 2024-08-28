import { Router } from "express";
import { crearOrdenConDetalles, getHistorial, getOrden, getOrdenDetalles, getOrdenes, updateOrden } from "../controllers/DetallesOrden.controllers.js";

import { authRol, validToken } from "../middleware/auth.js";

const route = Router();

route.get('/orden/historial/:fkUsuario',validToken,authRol(['Usuario','Administrador']),getHistorial);
route.get('/orden/detalles/:idOrden',validToken,authRol(['Usuario','Administrador']),getOrdenDetalles)
route.post('/orden',validToken,authRol(['Usuario','Administrador']), crearOrdenConDetalles);
route.get('/orden/:idOrden',validToken,authRol(['Administrador']),getOrden);
route.get('/orden',validToken,authRol(['Administrador']),getOrdenes);
route.put('/orden/:idOrden',validToken,authRol(['Administrador']),updateOrden);



export default route;