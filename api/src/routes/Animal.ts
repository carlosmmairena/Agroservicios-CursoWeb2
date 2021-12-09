
import { Router } from "express";
import { AnimalController } from "../controller/AnimalController";
import { checkJWT } from "../middleware/JwtMiddleware";

const router= Router();
//obtiene todos
router.get('/',AnimalController.getAll);
//crear 
router.post('/',AnimalController.new);
//modifica
router.patch('/:id');
//elimina
router.delete('/:id',AnimalController.delete);




export default router;