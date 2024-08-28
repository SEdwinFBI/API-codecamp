import { Router } from "express";
import { getEstado, getEstados, setEstado, updateEstado } from "../controllers/Estados.controllers.js";
import { authRol, validToken } from "../middleware/auth.js";



const router = Router();


router.get('/estados',validToken,authRol(['Administrador']),getEstados);
router.get('/estados/:idEstado',validToken,authRol(['Administrador']),getEstado);
router.post('/estados',validToken,authRol(['Administrador']),setEstado);
router.put('/estados/:idEstado',validToken,authRol(['Administrador']),updateEstado);

export default router;