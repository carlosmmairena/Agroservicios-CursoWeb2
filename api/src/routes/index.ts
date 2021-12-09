import { Router } from "express";
import { checkJWT } from "../middleware/JwtMiddleware"; 
import USER_ROUTER from "./UserRouter";
import AUTH_ROUTER from "./AuthRouter";
import PRODUCT_ROUTER from "./ProductRouter";
import PROFORMA_ROUTER from "./ProformaRouter";
import Raza from "./Raza";
import animal from "./animal";


const ROUTER = Router();

ROUTER.use('/usuario', USER_ROUTER);
ROUTER.use('/producto', [checkJWT], PRODUCT_ROUTER);
ROUTER.use('/proforma', [checkJWT], PROFORMA_ROUTER);
ROUTER.use('/auth', AUTH_ROUTER);
ROUTER.use('/raza', Raza);
ROUTER.use('/animal', animal);

export default ROUTER;
