import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";

const USER_ROUTER = Router();

USER_ROUTER.get("/", UsuarioController.all);
USER_ROUTER.get("/:id", UsuarioController.one);
USER_ROUTER.post("/", UsuarioController.save);

export default USER_ROUTER;

