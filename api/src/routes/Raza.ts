import { Router } from "express";
import { RazaController } from "../controller/RazaController";


const router= Router();

//obtiene todos
router.get('/', RazaController.getAll);
//obtiene 1 especifico mediante id
router.get('/:id', );
//crear 
router.post('/', );
//modifica
router.patch('/:id',);
//elimina
router.delete('/:id', );



export default router;