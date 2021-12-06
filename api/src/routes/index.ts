import { Router } from "express";
import { checkJWT } from "../middleware/JwtMiddleware"; 
import USER_ROUTER from "./UserRouter";
import AUTH_ROUTER from "./AuthRouter";
import PRODUCT_ROUTER from "./ProductRouter";
import PROFORMA_ROUTER from "./ProformaRouter";
import CONSEJO_ROUTER from "./ConsejoRouter"


const ROUTER = Router();

ROUTER.use('/usuario', USER_ROUTER);
ROUTER.use('/producto', [checkJWT], PRODUCT_ROUTER);
ROUTER.use('/proforma', [checkJWT], PROFORMA_ROUTER);
ROUTER.use('/consejo', [checkJWT], CONSEJO_ROUTER);
ROUTER.use('/auth', AUTH_ROUTER);

export default ROUTER;
