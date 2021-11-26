import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { isNull, isUndefined } from "util";
import { Producto } from "../entity/Producto";

export class ProductoController {

    static remove = async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            if(isNull(id) || isUndefined(id)) {
                return response.status(422).json({ message: 'ID de producto no proporcionado.' });
            }

            const productRepository = getRepository(Producto);
            const productToRemove = await productRepository.findOne(id);

            if (!productToRemove) {
                return response.status(404).json({ message: `Producto con ID ${id} no encontrado.` });
            }

            productToRemove.estado = false;
            await productRepository.save(productToRemove);

            return response.status(201).json({ message: 'Producto eliminado.' });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }

    /**
     * Busca un producto con el ID indicado en la URL
     * @param request 
     * @param response 
     * @returns 
     */
    static findById = async (request: Request, response: Response) => {

        const { id } = request.params;

        if(isNull(id) || isUndefined(id)) {
            return response.status(422).json({ message: 'ID de producto no proporcionado.' });
        }

        const productRepository = getRepository(Producto);
        const product = await productRepository.findOne({ where: {id: id},  relations: ['veterinario', 'insumo', 'construccion'] });

        if (!product) {
            return response.status(404).json({ message: `Producto con ID ${id} no encontrado.` });
        }
        
        response.status(200).json(product);
    }

}
