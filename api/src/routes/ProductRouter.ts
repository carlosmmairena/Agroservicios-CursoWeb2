import { Router } from "express";
import { InsumoProductoController } from "../controller/InsumoProductoController";
import { ProductoController } from "../controller/ProductoController";
import { VeterinarioProductoController } from "../controller/VeterinarioProductoController";

const PRODUCT_ROUTER = Router();

PRODUCT_ROUTER.get('/veterinarios',       VeterinarioProductoController.allVeterinario);
PRODUCT_ROUTER.post('/veterinario',       VeterinarioProductoController.saveVeterinario);
PRODUCT_ROUTER.put('/veterinario/:id',    VeterinarioProductoController.modifyVeterinario);

PRODUCT_ROUTER.get('/insumos',       InsumoProductoController.allVeterinario);
PRODUCT_ROUTER.post('/insumo',       InsumoProductoController.saveInsumo);
PRODUCT_ROUTER.put('/insumo/:id',    InsumoProductoController.modifyInsumo);


// Rutas de productos generales.
PRODUCT_ROUTER.delete('/:id', ProductoController.remove);   // Eliminar
PRODUCT_ROUTER.get('/:id',    ProductoController.findById); // Buscar por ID

export default PRODUCT_ROUTER;
