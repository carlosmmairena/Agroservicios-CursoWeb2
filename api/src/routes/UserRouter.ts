import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";
import { checkJWT } from "../middleware/JwtMiddleware";

const USER_ROUTER = Router();

USER_ROUTER.get("/", [checkJWT], UsuarioController.all);
USER_ROUTER.get("/:id", [checkJWT], UsuarioController.one);
USER_ROUTER.post("/", UsuarioController.save);
USER_ROUTER.put("/:id", [checkJWT], UsuarioController.modify);
USER_ROUTER.delete("/:id", [checkJWT], UsuarioController.remove);

export default USER_ROUTER;

