import { Router } from "express";
import { ConstruccionProductoController } from "../controller/ConstruccionProductoController";
import { InsumoProductoController } from "../controller/InsumoProductoController";
import { ProductoController } from "../controller/ProductoController";
import { VeterinarioProductoController } from "../controller/VeterinarioProductoController";

const PRODUCT_ROUTER = Router();

PRODUCT_ROUTER.get('/veterinarios',    VeterinarioProductoController.allVeterinario);
PRODUCT_ROUTER.post('/veterinario',    VeterinarioProductoController.saveVeterinario);
PRODUCT_ROUTER.put('/veterinario/:id', VeterinarioProductoController.modifyVeterinario);

PRODUCT_ROUTER.get('/insumos',    InsumoProductoController.allInsumo);
PRODUCT_ROUTER.post('/insumo',    InsumoProductoController.saveInsumo);
PRODUCT_ROUTER.put('/insumo/:id', InsumoProductoController.modifyInsumo);

PRODUCT_ROUTER.get('/construcciones',   ConstruccionProductoController.allConstruccion);
PRODUCT_ROUTER.post('/construccion',    ConstruccionProductoController.saveConstruccion);
PRODUCT_ROUTER.put('/construccion/:id', ConstruccionProductoController.modifyConstruccion);


// Rutas de productos generales.
PRODUCT_ROUTER.delete('/:id', ProductoController.remove);   // Eliminar
PRODUCT_ROUTER.get('/:id',    ProductoController.findById); // Buscar por ID

export default PRODUCT_ROUTER;
