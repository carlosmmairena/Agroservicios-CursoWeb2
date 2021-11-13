import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Producto } from "../entity/Producto";
import { isNull, isUndefined } from "util";
import { Veterinario } from "../entity/Veterinario";

export class ProductoController {

    static allVeterinario = async (request: Request, response: Response) => {
        const productRepository = getRepository(Producto);
        const products = await productRepository.find({ relations: ['veterinario'] });
        
        if (products.length < 1) {
            return response.status(404).json({ message: 'No hay productos registrados.' });
        }

        return response.status(200).json(products);
    }


    static findById = async (request: Request, response: Response) => {

        const { id } = request.params;

        if(isNull(id) || isUndefined(id)) {
            return response.status(422).json({ message: 'ID de producto no proporcionado.' });
        }

        const productRepository = getRepository(Producto);
        const product = await productRepository.findOne(id);

        if (!product) {
            return response.status(404).json({ message: `Producto con ID ${id} no encontrado.` });
        }
        
        response.status(200).json(product);
    }


    /**
     * Guarda un producto de tipo Veterinario.
     * 
     * @param request 
     * @param response 
     * @returns status
     */
    static saveVeterinario = async (request: Request, response: Response) => {
        try {
            const productRepository = getRepository(Producto);
            const { nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, tipoAnimal } = request.body;
            
            const dataValidated = Veterinario.checkData({ nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, tipoAnimal });
            
            if (dataValidated.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataValidated.errors });
            }

            // TODO: Debería haber un 'código de producto' para que el usuario pueda identificar de manera distinta un producto...
            const anotherProduct = await productRepository.findOne({ select: ['id', 'estado', 'nombre'], where: {nombre: nombre} });
            if(anotherProduct) {
                return response.status(422).json({ message: `Ya existe otro producto con el nombre: ${nombre}`});
            }


            const productToSave          = new Producto();
            productToSave.nombre         = nombre;
            productToSave.descripcion    = descripcion;
            productToSave.marca          = marca;
            productToSave.precioUnitario = precioUnitario;
            productToSave.stock          = stock;
            productToSave.unidadMedida   = unidadMedida;
            productToSave.estado         = estado;

            const veterinarioToSave = new Veterinario();

            veterinarioToSave.tipoAnimal = tipoAnimal;
            veterinarioToSave.producto   = productToSave;

            const formatoDatosVeterinarioValidado = await Veterinario.validate(veterinarioToSave);

            if (formatoDatosVeterinarioValidado.length) {
                return response.status(422).json({ message: "Los datos no cumplen con el formato adecuado", details: formatoDatosVeterinarioValidado });
            }

            await productRepository.save(productToSave);
            const veterinarioProductRepository = getRepository(Veterinario);

            const veterinarioProductSaved = await veterinarioProductRepository.save(veterinarioToSave);
            
            return response.status(201).json({ message: 'Producto registrado', producto: veterinarioProductSaved });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }


    static modifyVeterinario = async (request: Request, response: Response) => {
        try {
            const productRepository = getRepository(Producto);
            const { id } = request.params;
            const { nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, tipoAnimal } = request.body;
            
            const dataValidated = Veterinario.checkData({ nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, tipoAnimal });
            
            if (dataValidated.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataValidated.errors });
            }

            // TODO: Debería haber un 'código de producto' para que el usuario pueda identificar de manera distinta un producto...
            const productToEdit = await productRepository.findOne(id, { relations: ['veterinario'] });
            if(!productToEdit) {
                return response.status(404).json({ message: `No se encuentra el producto con ID: ${id}`});
            }

            const anotherProduct = await productRepository.findOne({ select: ['id', 'nombre'], where: {nombre: nombre} });
            if((anotherProduct) && (anotherProduct.id != productToEdit.id)) {
                return response.status(422).json({ message: `Ya existe otro producto con el nombre: ${nombre}`});
            }


            productToEdit.nombre         = nombre;
            productToEdit.descripcion    = descripcion;
            productToEdit.marca          = marca;
            productToEdit.precioUnitario = precioUnitario;
            productToEdit.stock          = stock;
            productToEdit.unidadMedida   = unidadMedida;
            productToEdit.estado         = estado;

            const veterinarioToEdit = productToEdit.veterinario;

            veterinarioToEdit.tipoAnimal = tipoAnimal;
            veterinarioToEdit.producto   = productToEdit;

            const formatoDatosVeterinarioValidado = await Veterinario.validate(veterinarioToEdit);

            if (formatoDatosVeterinarioValidado.length) {
                return response.status(422).json({ message: "Los datos no cumplen con el formato adecuado", details: formatoDatosVeterinarioValidado });
            }

            const veterinarioProductRepository = getRepository(Veterinario);
            await productRepository.save(productToEdit);
            await veterinarioProductRepository.save(veterinarioToEdit);
            
            return response.status(201).json({ message: 'Producto actualizado'});

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }

/* 
    static remove = async (request: Request, response: Response) => {
        const userRepository = getRepository(Usuario);
        let userToRemove = await userRepository.findOne(request.params.id);
        const removed = await userRepository.remove(userToRemove);

        return response.status(200).json(removed);
    } */

}
