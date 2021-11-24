import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";

const USER_ROUTER = Router();

USER_ROUTER.get("/", UsuarioController.all);
USER_ROUTER.get("/:id", UsuarioController.one);
USER_ROUTER.post("/", UsuarioController.save);
USER_ROUTER.put("/:id", UsuarioController.modify);
USER_ROUTER.delete("/:id", UsuarioController.remove);

export default USER_ROUTER;

