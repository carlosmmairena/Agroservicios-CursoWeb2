
import { Router } from "express";
import { AnimalController } from "../controller/AnimalController";

const ANIMAL_ROUTER = Router();
//obtiene todos
ANIMAL_ROUTER.get('/',AnimalController.getAll);
//crear 
ANIMAL_ROUTER.post('/',AnimalController.new);
//modifica
ANIMAL_ROUTER.patch('/:id', AnimalController.modify);
//elimina
ANIMAL_ROUTER.delete('/:id',AnimalController.delete);

export default ANIMAL_ROUTER;
