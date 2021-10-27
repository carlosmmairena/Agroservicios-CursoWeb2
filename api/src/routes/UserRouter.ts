import { Router } from "express";
import { UserController } from "../controller/UserController";

const USER_ROUTER = Router();

USER_ROUTER.get("/", UserController.all);
USER_ROUTER.get("/:id", UserController.one);
USER_ROUTER.post("/", UserController.save);

export default USER_ROUTER;

