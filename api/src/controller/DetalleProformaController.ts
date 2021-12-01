import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { isArray, isNullOrUndefined } from "util";
import { DetalleProforma } from "../entity/DetalleProforma";
import { Producto } from "../entity/Producto";
import { Proforma } from "../entity/Proforma";

export class DetalleProformController {


    /**
     * Muesta detalles de una proforma.
     * 
     * @param request 
     * @param response 
     */
    static showDetalles = async (request: Request, response: Response) => {
        
        try{
            const { id } = request.params;

            
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
     * Agrega una lista de detalles a una proforma o a la lista de deseos.
     * 
     * @param request 
     * @param response 
     */
    static addDetalles = async (request: Request, response: Response) => {
        try {
            const { id }        = request.params;
            const { productos } = request.body;

            if (isNullOrUndefined(productos)) {
                return response.status(422).json({ message: 'productos es requerido.' });
            }

            if (!isArray(productos)) {
                return response.status(422).json({ message: 'productos debe ser un array.' });
            }

            if (productos.length < 1) {
                return response.status(422).json({ message: 'productos no puede ser vacío' });
            }


            // Busca la proforma a editar
            const proformaRepository = getRepository(Proforma);
            const proformaToEdit     = await proformaRepository.findOne(id, { where: { estado: true } });

            if (isNullOrUndefined(proformaToEdit)) {
                return response.status(404).json({ message: `No se encuentra una proforma con ID ${id}.` });
            }

            // Busca los productos a guardar, y crea el detalle de cada uno.
            const productoRepository = getRepository(Producto);

            const detalles = productos.map( async (value) => {
                const productLocated = await productoRepository.findOne(value.id);

                if (!isNullOrUndefined(value)) {
                    return DetalleProforma.create(productLocated, proformaToEdit, value.cantidadComprar);
                }
            })


            // Obtenemos las promesas.
            const detallesToSave = await Promise.all<DetalleProforma>(detalles).then((detalles) => {
                return detalles;
            }).catch((error) => {
                console.error(error);
                return undefined;
            });


            // Se guarda cada uno de los detalles
            const detalleRepository = getRepository(DetalleProforma);
            detallesToSave.forEach( async (detalle) => {
                await detalleRepository.save(detalle);
            });

            return response.status(201).json({ message: 'Detalles de proforma han sido agregados.' });

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
     * Remueve un detalle de una proforma.
     * 
     * @param request 
     * @param response 
     */
    static removeDetalle = async (request: Request, response: Response) => {
        try {

            const { id } = request.params;

            // Busca el detalle a eliminar
            const detalleRepository = getRepository(DetalleProforma);
            const detalleToRemove   = await detalleRepository.findOne(id);

            if (isNullOrUndefined(detalleToRemove)) {
                return response.status(404).json({ message: `No se encuentra un detalle con ID ${id}.` });
            }

            await detalleRepository.remove(detalleToRemove);

            return response.status(201).json({ message: 'Detalle de proforma ha sido eliminado.', detalle: detalleToRemove });

        } catch (error) {
            const messages = {
                message: 'Algo ha salido mal...',
                error: error
            };

            console.error(error);
            return response.status(503).json(messages);
        }
    }

    static updateDetalle = async (request: Request, response: Response) => {
    }

}
