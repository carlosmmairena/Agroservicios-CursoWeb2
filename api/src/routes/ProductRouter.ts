import { Router } from "express";
import { ProductoController } from "../controller/ProductoController";

const PRODUCT_ROUTER = Router();

PRODUCT_ROUTER.get('/veterinarios', ProductoController.allVeterinario);
PRODUCT_ROUTER.get('/:id', ProductoController.findById);
PRODUCT_ROUTER.post('/veterinario', ProductoController.saveVeterinario);

export default PRODUCT_ROUTER;
