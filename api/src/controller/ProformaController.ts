import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { isNullOrUndefined } from "util";
import { Cliente } from "../entity/Cliente";
import { Proforma } from "../entity/Proforma";
import { Usuario } from "../entity/Usuario";
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

        //const proformas = await proformaRepository.find();
        const proformas = await proformaRepository.find({ where: { estado: true } });

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


            // Busca el cliente que solicita la proforma
            const cliente = await clienteRepository.findOne( { id: idCliente }, { select: ['correo', 'id', 'estado'] });

            if (isNullOrUndefined(cliente)) {
                return response.status(404).json({ message: `No se encuentra cliente con ID ${idCliente}.` });
            }

            if (!cliente.estado) {
                return response.status(422).json({ message: `El cliente con ID ${idCliente}, ha sido desactivado.` });
            }


            // Crea la proforma
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
     * Edita una proforma ya persistida y agrega el usuario que está modificando.
     * 
     * @param request 
     * @param response 
     */
    static modifyProforma = async (request: Request, response: Response) => {

        try {
            const { id } = request.params;
            const { idUsuario, idCliente, formaPago, porcentajeDescuento } = request.body;

            if (isNullOrUndefined(idUsuario)) {
                return response.status(404).json({ message: 'Debe proporcionar el ID del usuario que asignará a esta proforma.' });
            }

            const dataChecked = Proforma.checkData({ idCliente, formaPago, porcentajeDescuento });
            
            if (dataChecked.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataChecked.errors });
            }


            // Busca la proforma a modificar
            const proformaRepository = getRepository(Proforma);
            const proformaToEdit     = await proformaRepository.findOne(id);

            if (isNullOrUndefined(proformaToEdit)) {
                return response.status(404).json({ message: `No se encuentra una proforma con ID ${id}.` });
            }
            

            // Busca el cliente que solicita la proforma
            const clienteRepository = getRepository(Cliente);
            const cliente = await clienteRepository.findOne( { id: idCliente }, { select: ['correo', 'id', 'estado'] });

            if (isNullOrUndefined(cliente)) {
                return response.status(404).json({ message: `No se encuentra cliente con ID ${idCliente}.` });
            }

            if (!cliente.estado) {
                return response.status(422).json({ message: `El cliente con ID ${idCliente}, ha sido desactivado.` });
            }


            // Busca el usuario a asignar
            const usuarioRepository = getRepository(Usuario);
            const usuario           = await usuarioRepository.findOne( { id: idUsuario }, { select: ['correo', 'id', 'estado'] });

            if (isNullOrUndefined(usuario)) {
                return response.status(404).json({ message: `No se encuentra usuario con ID ${idUsuario}.` });
            }

            if (!usuario.estado) {
                return response.status(422).json({ message: `El cliente con ID ${idCliente}, ha sido desactivado.` });
            }


            // Modifica los datos de la proforma
            proformaToEdit.formaPago           = formaPago;
            proformaToEdit.porcentajeDescuento = porcentajeDescuento;
            proformaToEdit.fechaEmisiom        = new Date();
            proformaToEdit.usuario             = usuario;
            proformaToEdit.cliente             = cliente;

            const entityValidated = await validators.validateEntity(proformaToEdit);

            if (entityValidated.length) {
                return response.status(422).json({ message: "Los datos no cumplen con el formato adecuado", details: entityValidated });
            }

            await proformaRepository.save(proformaToEdit);

            return response.status(201).json({ message: 'Proforma ha sido modificada.', proforma: proformaToEdit });

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


    /**
     * Elimina una proforma, recibe el ID de la proforma a eliminar.
     * 
     * @param request 
     * @param response 
     * @returns 
     */
    static removeProforma = async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            // Busca la proforma a eliminar
            const proformaRepository = getRepository(Proforma);
            const proformaToRemove   = await proformaRepository.findOne(id, { where: { estado: true } });

            if (isNullOrUndefined(proformaToRemove)) {
                return response.status(404).json({ message: `No se encuentra una proforma con ID ${id}.` });
            }

            proformaToRemove.estado = false;
            await proformaRepository.save(proformaToRemove);

            return response.status(201).json({ message: 'Proforma ha sido eliminada.', proforma: proformaToRemove });


        } catch (error) {
            const messages = {
                message: 'Algo ha salido mal...',
                error: error
            };

            console.error(error);
            return response.status(503).json(messages);
        }
    }

}
