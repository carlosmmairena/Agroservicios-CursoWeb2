import { Router } from "express";
import { AuthController } from "../controller/AuthController";

const AUTH_ROUTER = Router();

AUTH_ROUTER.post('/login', AuthController.login);
//AUTH_ROUTER.put('/change-password');
//AUTH_ROUTER.put('/update-token');

export default AUTH_ROUTER;
