import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { isNullOrUndefined } from "util";
import { Cliente } from "../entity/Cliente";
import { Proforma } from "../entity/Proforma";
import validators from "../utils/validators";

export class ProformaController {

    /**
     * Crea una lista de deseos para un cliente.
     *
     * @param request 
     * @param response 
     */
    static createWishList = async (request: Request, response: Response) => {
    }


    /**
     * Muestra todas las proforma activas.
     * @param request 
     * @param response 
     */
    static showProformas = async (request: Request, response: Response) => {
        const { id } = request.params;
        const proformaRepository = getRepository(Proforma);

        //const proformas = await proformaRepository.findAndCount({ where: { estado: true } });
        const proformas = await proformaRepository.find();

        return response.status(200).json({ proformas: proformas, message: 'Proformas encontradas.' });
    }

    /**
     * Agrega una lista de detalles a una proforma o a la lista de deseos.
     * 
     * @param request 
     * @param response 
     */
    static addDetalles = async (request: Request, response: Response) => {
    }


    /**
     * Persiste una proforma.
     * 
     * @param request 
     * @param response 
     */
    static saveProforma = async (request: Request, response: Response) => {
        
        try {
            const { idCliente, formaPago, porcentajeDescuento } = request.body;

            const clienteRepository = getRepository(Cliente);
            
            const dataChecked = Proforma.checkData({ idCliente, formaPago, porcentajeDescuento });
            
            if (dataChecked.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataChecked.errors });
            }


            const cliente = await clienteRepository.findOne( { id: idCliente }, { select: ['correo', 'id', 'estado'] });

            if (isNullOrUndefined(cliente)) {
                return response.status(404).json({ message: `No se encuentra cliente con ID ${idCliente}.` });
            }

            if (!cliente.estado) {
                return response.status(422).json({ message: `El cliente con ID ${idCliente}, ha sido desactivado.` });
            }

            const proformaToSave               = new Proforma();
            proformaToSave.formaPago           = formaPago;
            proformaToSave.porcentajeDescuento = porcentajeDescuento;
            proformaToSave.fechaEmisiom        = new Date();
            proformaToSave.cliente             = cliente;

            const entityValidated = await validators.validateEntity(proformaToSave);

            if (entityValidated.length) {
                return response.status(422).json({ message: "Los datos no cumplen con el formato adecuado", details: entityValidated });
            }

            const proformaRepository = getRepository(Proforma);
            const proformaSaved = await proformaRepository.save(proformaToSave);

            return response.status(201).json({ message: 'Proforma ha sido guardada.', proforma: proformaSaved });

        } catch (error) {
            const messages = {
                message: 'Algo ha salido mal...',
                error: error
            };

            console.error(error);
            return response.status(503).json(messages);
        }

    }


    /**
     * Edita una proforma ya persistida.
     * 
     * @param request 
     * @param response 
     */
    static modifyProforma = async (request: Request, response: Response) => {
    }


    /**
     * Confirma una proforma de un cliente.
     * 
     * @param request 
     * @param response 
     */
    static confirmProforma = async (request: Request, response: Response) => {
    }


    /**
     * Cancela la proforma de un cliente.
     * 
     * @param request 
     * @param response 
     */
    static cancelProforma = async (request: Request, response: Response) => {
    }


    static removeProforma = async (request: Request, response: Response) => {
    }

}
