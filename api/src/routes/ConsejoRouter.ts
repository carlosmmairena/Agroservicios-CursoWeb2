import { Router } from "express";
import { ConsejoController } from "../controller/ConsejoController";
import { checkJWT } from "../middleware/JwtMiddleware";

const CONSEJO_ROUTER = Router();

CONSEJO_ROUTER.get("/", [checkJWT], ConsejoController.all);
CONSEJO_ROUTER.get("/:id", [checkJWT], ConsejoController.one);
CONSEJO_ROUTER.post("/", ConsejoController.save);
CONSEJO_ROUTER.put("/:id", [checkJWT], ConsejoController.modify);
CONSEJO_ROUTER.delete("/:id", [checkJWT], ConsejoController.remove);

export default CONSEJO_ROUTER;
