
import { Router } from "express";
import auth from "./auth";
import clientes from "./clientes";
import usuarios from "./usuarios";



const router= Router();

router.use('/auth', auth)
router.use('/usuario', usuarios)
router.use('/cliente', clientes)






export default router;