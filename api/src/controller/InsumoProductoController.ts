import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Producto } from "../entity/Producto";
import { isNull, isUndefined } from "util";
import { Insumo } from "../entity/Insumo";

export class InsumoProductoController {

    static allInsumo = async (request: Request, response: Response) => {
        const productRepository = getRepository(Insumo);
        const products = await productRepository.find({ relations: ['producto'] });
        
        if (products.length < 1) {
            return response.status(404).json({ message: 'No hay productos de insumo registrados.' });
        }

        return response.status(200).json(products);
    }


    /**
     * Guarda un producto de tipo Insumo.
     * 
     * @param request 
     * @param response 
     * @returns status
     */
    static saveInsumo = async (request: Request, response: Response) => {
        try {
            const productRepository = getRepository(Producto);
            const { nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, fechaVencimiento, tipoInsumo } = request.body;
            
            const dataValidated = Insumo.checkData({ nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, fechaVencimiento, tipoInsumo });
            
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

            const insumoToSave = new Insumo();

            insumoToSave.fechaVencimiento = fechaVencimiento;
            insumoToSave.tipoInsumo       = tipoInsumo;
            insumoToSave.producto         = productToSave;

            const formatoDatosInsumoValidado = await Insumo.validate(insumoToSave);

            if (formatoDatosInsumoValidado.length) {
                return response.status(422).json({ message: "Los datos no cumplen con el formato adecuado", details: formatoDatosInsumoValidado });
            }

            await productRepository.save(productToSave);
            const insumoProductRepository = getRepository(Insumo);

            const insumoProductSaved = await insumoProductRepository.save(insumoToSave);
            
            return response.status(201).json({ message: 'Producto registrado', insumo: insumoProductSaved });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }


    /**
     * Modifica un producto de tipo Insumo
     * @param request 
     * @param response 
     * @returns 
     */
    static modifyInsumo = async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            
            if(isNull(id) || isUndefined(id)) {
                return response.status(422).json({ message: 'ID de producto no proporcionado.' });
            }


            const productRepository = getRepository(Producto);
            const { nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, fechaVencimiento, tipoInsumo } = request.body;
            
            const dataValidated = Insumo.checkData({ nombre, descripcion, marca, precioUnitario, stock, unidadMedida, estado, fechaVencimiento, tipoInsumo });
            
            if (dataValidated.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataValidated.errors });
            }

            // TODO: Debería haber un 'código de producto' para que el usuario pueda identificar de manera distinta un producto...
            const productToEdit = await productRepository.findOne(id, { relations: ['insumo'] });
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

            const insumoToEdit = productToEdit.insumo;

            insumoToEdit.fechaVencimiento = fechaVencimiento;
            insumoToEdit.tipoInsumo       = tipoInsumo;
            insumoToEdit.producto         = productToEdit;

            const formatoDatosInsumoValidado = await Insumo.validate(insumoToEdit);

            if (formatoDatosInsumoValidado.length) {
                return response.status(422).json({ message: "Los datos no cumplen con el formato adecuado", details: formatoDatosInsumoValidado });
            }

            const insumoProductRepository = getRepository(Insumo);
            await productRepository.save(productToEdit);
            await insumoProductRepository.save(insumoToEdit);
            
            return response.status(201).json({ message: 'Producto actualizado'});

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }

}
