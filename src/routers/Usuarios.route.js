import { Router } from "express";
import { getUsuario, getUsuarios, setUsuario, updateUsuario } from "../controllers/Usuarios.controllers.js";
import { authRol, validToken } from "../middleware/auth.js";

const router = Router();

router.get('/usuarios/:idUsuario',validToken,authRol(['Administrador']),getUsuario);
router.get('/usuarios',validToken,authRol(['Administrador']),getUsuarios);
router.put('/usuarios/:idUsuario',validToken,authRol(['Administrador']),updateUsuario);
router.post('/usuarios',validToken,authRol(['Administrador']),setUsuario);

export default router;

