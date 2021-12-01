import { Router } from "express";
import { DetalleProformController } from "../controller/DetalleProformaController";
import { ProformaController } from "../controller/ProformaController";

const PROFORMA_ROUTER = Router();

PROFORMA_ROUTER.get('/',                 ProformaController.showProformas);
PROFORMA_ROUTER.post('/',                ProformaController.saveProforma);
PROFORMA_ROUTER.put('/:id',              ProformaController.modifyProforma);
PROFORMA_ROUTER.put('/cancel/:id',       ProformaController.cancelProforma);
PROFORMA_ROUTER.put('/confirm/:id',      ProformaController.confirmProforma);
PROFORMA_ROUTER.delete('/:id',           ProformaController.removeProforma);

PROFORMA_ROUTER.put('/add-detalles/:id', DetalleProformController.addDetalles);
PROFORMA_ROUTER.delete('/remove-detalle/:id', DetalleProformController.removeDetalle);

export default PROFORMA_ROUTER;
