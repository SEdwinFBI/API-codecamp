import { Router } from "express";
import { getUsuario, getUsuarios, setUsuario, updateUsuario } from "../controllers/Usuarios.controllers.js";
import { authRol, validToken } from "../middleware/auth.js";
import { restricted } from "../helpers/envRol.js";
const router = Router();

router.get('/usuarios/:idUsuario',validToken,authRol([restricted]),getUsuario);
router.get('/usuarios',validToken,authRol([restricted]),getUsuarios);
router.put('/usuarios/:idUsuario',validToken,authRol([restricted]),updateUsuario);
router.post('/usuarios',validToken,authRol([restricted]),setUsuario);

export default router;

