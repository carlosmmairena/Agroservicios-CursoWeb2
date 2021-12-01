import { Router } from "express";

const router= Router();
//obtiene todos
router.get('/');
//obtiene 1 especifico mediante id
router.get('/:id');
//crear 
router.post('/');
//modifica
router.patch('/');
//elimina
router.delete('/:id');




export default router;