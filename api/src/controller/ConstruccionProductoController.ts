import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Producto } from "../entity/Producto";
import { isNull, isUndefined } from "util";
import { Construccion } from "../entity/Construccion";

export class ConstruccionProductoController {

    static allConstruccion = async (request: Request, response: Response) => {
        const productRepository = getRepository(Construccion);
        const products = await productRepository.find({ relations: ['producto'] });
        
        if (products.length < 1) {
            return response.status(404).json({ message: 'No hay productos de construcción registrados.' });
        }

        return response.status(200).json(products);
    }


    /**
     * Guarda un producto de tipo Construccion.
     * 
     * @param request 
     * @param response 
     * @returns status
     */
    static saveConstruccion = async (request: Request, response: Response) => {
        try {
            const productRepository = getRepository(Producto);
            const { nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, fragil } = request.body;
            
            const dataValidated = Construccion.checkData({ nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, fragil });
            
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

            const construccionToSave = new Construccion();

            construccionToSave.fragil   = fragil;
            construccionToSave.producto = productToSave;

            const formatoDatosConstruccionValidado = await Construccion.validate(construccionToSave);

            if (formatoDatosConstruccionValidado.length) {
                return response.status(422).json({ message: "Los datos no cumplen con el formato adecuado", details: formatoDatosConstruccionValidado });
            }

            await productRepository.save(productToSave);
            const construccionProductRepository = getRepository(Construccion);

            const construccionProductSaved = await construccionProductRepository.save(construccionToSave);
            
            return response.status(201).json({ message: 'Producto registrado', cosntruccion: construccionProductSaved });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }


    /**
     * Modifica un producto de tipo Construccion
     * @param request 
     * @param response 
     * @returns 
     */
    static modifyConstruccion = async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            
            if(isNull(id) || isUndefined(id)) {
                return response.status(422).json({ message: 'ID de producto no proporcionado.' });
            }


            const productRepository = getRepository(Producto);
            const { nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, fragil } = request.body;
            
            const dataValidated = Construccion.checkData({ nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, fragil });
            
            if (dataValidated.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataValidated.errors });
            }

            // TODO: Debería haber un 'código de producto' para que el usuario pueda identificar de manera distinta un producto...
            const productToEdit = await productRepository.findOne(id, { relations: ['construccion'] });
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

            const insumoToEdit = productToEdit.construccion;

            insumoToEdit.fragil   = fragil;
            insumoToEdit.producto = productToEdit;

            const formatoDatosConstruccionValidado = await Construccion.validate(insumoToEdit);

            if (formatoDatosConstruccionValidado.length) {
                return response.status(422).json({ message: "Los datos no cumplen con el formato adecuado", details: formatoDatosConstruccionValidado });
            }

            const construccionProductRepository = getRepository(Construccion);
            await productRepository.save(productToEdit);
            await construccionProductRepository.save(insumoToEdit);
            
            return response.status(201).json({ message: 'Producto actualizado'});

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }

}
