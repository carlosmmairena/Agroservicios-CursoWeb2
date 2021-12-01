import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { isNullOrUndefined } from "util";
import { Cliente } from "../entity/Cliente";
import { DetalleProforma } from "../entity/DetalleProforma";
import { Proforma } from "../entity/Proforma";
import { Usuario } from "../entity/Usuario";
import validators from "../utils/validators";

export class ProformaController {

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
     * Retorna la proforma y sus detalles
     * 
     * @param request 
     * @param response 
     * @returns 
     */
    static findProformaById = async (request: Request, response: Response) => {
        const { id } = request.params;
        const proformaRepository = getRepository(Proforma);

        const proforma = await proformaRepository.findOne( id ,{ where: { estado: true }, relations: ['detallesProformas'] });
        
        if (isNullOrUndefined(proforma)) {
            return response.status(404).json({ message: `No se encuetra una proforma con ID ${id}` });
        }

        return response.status(200).json({ proforma: proforma, message: 'Proformas encontradas.' });
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
            proformaToSave.estado              = true;
            proformaToSave.canceled            = false;

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
            const { idUsuario, idCliente, formaPago, porcentajeDescuento, estado, canceled } = request.body;

            if (isNullOrUndefined(idUsuario)) {
                return response.status(404).json({ message: 'Debe proporcionar el ID del usuario que asignará a esta proforma.' });
            }


            if (isNullOrUndefined(estado)) {
                return response.status(422).json({ message: 'Debe proporcionar el campo estado.' });
            }

            if (isNullOrUndefined(canceled)) {
                return response.status(422).json({ message: 'Debe proporcionar el campo canceled.' });
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
            proformaToEdit.estado              = estado;
            proformaToEdit.canceled            = canceled;

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
     * Cancela la proforma de un cliente.
     * 
     * @param request 
     * @param response 
     */
    static cancelProforma = async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            // Busca la proforma a eliminar
            const proformaRepository = getRepository(Proforma);
            const proformaToCancel   = await proformaRepository.findOne(id, { where: { estado: true }, select: ['id', 'estado', 'fechaEmisiom', 'canceled', 'formaPago'], loadEagerRelations: false });

            if (isNullOrUndefined(proformaToCancel)) {
                return response.status(404).json({ message: `No se encuentra una proforma con ID ${id}.` });
            }

            proformaToCancel.canceled = true;
            await proformaRepository.save(proformaToCancel);

            return response.status(201).json({ message: 'Proforma ha sido cancelada.', proforma: proformaToCancel });


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
