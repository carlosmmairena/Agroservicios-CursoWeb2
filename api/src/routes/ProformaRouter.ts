import { Router } from "express";
import { ProformaController } from "../controller/ProformaController";

const PROFORMA_ROUTER = Router();

PROFORMA_ROUTER.get('/',                 ProformaController.showProformas);
PROFORMA_ROUTER.post('/',                ProformaController.saveProforma);
PROFORMA_ROUTER.put('/:id',              ProformaController.modifyProforma);
PROFORMA_ROUTER.put('/add-detalles/:id', ProformaController.addDetalles);
PROFORMA_ROUTER.put('/cancel/:id',       ProformaController.cancelProforma);
PROFORMA_ROUTER.put('/confirm/:id',      ProformaController.confirmProforma);
PROFORMA_ROUTER.delete('/:id',           ProformaController.removeProforma);

export default PROFORMA_ROUTER;
