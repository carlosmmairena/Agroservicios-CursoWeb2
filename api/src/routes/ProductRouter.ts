import { Router } from "express";
import { VeterinarioProductoController } from "../controller/VeterinarioProductoController";

const PRODUCT_ROUTER = Router();

PRODUCT_ROUTER.get('/veterinarios',       VeterinarioProductoController.allVeterinario);
PRODUCT_ROUTER.get('/:id',                VeterinarioProductoController.findById);
PRODUCT_ROUTER.post('/veterinario',       VeterinarioProductoController.saveVeterinario);
PRODUCT_ROUTER.put('/veterinario/:id',    VeterinarioProductoController.modifyVeterinario);
PRODUCT_ROUTER.delete('/veterinario/:id', VeterinarioProductoController.remove);

export default PRODUCT_ROUTER;
