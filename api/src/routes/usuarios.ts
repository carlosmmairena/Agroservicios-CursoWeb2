import { Router } from "express";
import { UsuariosController } from "../controller/UsuariosController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";

const router= Router();
//obtiene todos
router.get('/',[checkJwt, checkRole(['admin', 'user'])],UsuariosController.getAll);
//obtiene 1 especifico mediante id
router.get('/:id',[checkJwt, checkRole(['admin', 'user'])], UsuariosController.getById);
//crear 
router.post('/', [checkJwt, checkRole(['admin'])],UsuariosController.new);
//modifica
router.patch('/:id', [checkJwt, checkRole(['admin'])],UsuariosController.modify);
//elimina
router.delete('/:id', [checkJwt, checkRole(['admin'])], UsuariosController.delete);




export default router;