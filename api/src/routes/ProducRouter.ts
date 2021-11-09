import { Router } from "express";
import { ProductoController } from "../controller/ProductoController";

const PRODUCT_ROUTER = Router();

PRODUCT_ROUTER.get('/', ProductoController.all);
PRODUCT_ROUTER.get('/:id', ProductoController.findById);

export default PRODUCT_ROUTER;
