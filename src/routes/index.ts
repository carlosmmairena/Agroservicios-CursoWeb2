import { Router } from "express";
import USER_ROUTER from "./UserRouter";

const ROUTER = Router();

ROUTER.use('/usuario', USER_ROUTER);

export default ROUTER;
