import { Router } from "express";
import { getEstado, getEstados, setEstado, updateEstado } from "../controllers/Estados.controllers.js";
import { authRol, validToken } from "../middleware/auth.js";
import { restricted } from "../helpers/envRol.js";



const router = Router();


router.get('/estados',validToken,authRol([restricted]),getEstados);
router.get('/estados/:idEstado',validToken,authRol([restricted]),getEstado);
router.post('/estados',validToken,authRol([restricted]),setEstado);
router.put('/estados/:idEstado',validToken,authRol([restricted]),updateEstado);

export default router;