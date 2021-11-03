import { Router } from "express";
import { checkJWT } from "../middleware/JwtMiddleware"; 
import USER_ROUTER from "./UserRouter";
import AUTH_ROUTER from "./AuthRouter";


const ROUTER = Router();

ROUTER.use('/usuario', [checkJWT], USER_ROUTER);
ROUTER.use('/auth', AUTH_ROUTER);

export default ROUTER;
