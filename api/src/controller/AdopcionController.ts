import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Adopcion } from "../entity/Adopcion";

export class AdopcionController {
    static all = async (request: Request, response: Response) => {
        
        const adopcionRepository = getRepository(Adopcion);
        const adopciones = await adopcionRepository.find({ where: { estado: true } });
        
        if (adopciones.length < 1) {
            return response.status(404).json({ message: 'Adopciones activas' });
        }
        
        return response.status(200).json(adopciones);
    }


    static findById = async (request: Request, response: Response) => {
        try {
            const adopcionRepository = getRepository(Adopcion);

            const { id } = request.params;

            const adopcion = await adopcionRepository.findOne(id);

            if (!adopcion) {
                return response.status(404).json({ message: `No se encuentra una adopción con ID ${id}` });
            }

            return response.status(200).json({ adopcion: adopcion });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }


    static save = async (request: Request, response: Response) => {
        try {
            const adopcionRepository = getRepository(Adopcion);
            const { vacunado, fechaAdopcion, descripcion } = request.body;

            const dataValidated = Adopcion.checkData({ vacunado, fechaAdopcion, descripcion });
        
            if (dataValidated.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataValidated.errors });
            }
        
            const adopcionToSave         = new Adopcion();
            adopcionToSave.vacunado      = vacunado;
            adopcionToSave.fechaAdopcion = fechaAdopcion;
            adopcionToSave.descripcion   = descripcion;
            // TODO: Falta asignar el objeto animal...
            //adopcionToSave.animal        = animal;
            
            const errorsFormat = await Adopcion.validate(adopcionToSave);
            if (errorsFormat.length) {
                return response.status(422).json({ message: "Los datos no cumplen con el formato adecuado", details: errorsFormat });
            }

            const adopcionSaved = await adopcionRepository.save(adopcionToSave);
            return response.status(201).json({ message: 'Adopción registrada.', adopcion: adopcionSaved });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }


    static modify = async (request: Request, response: Response) => {
        try {
            const adopcionRepository = getRepository(Adopcion);
            const { id } = request.params;
            const { vacunado, fechaAdopcion, descripcion } = request.body;

            const dataValidated = Adopcion.checkData({ vacunado, fechaAdopcion, descripcion });
        
            if (dataValidated.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataValidated.errors });
            }
        
            const adopcionToEdit         = await adopcionRepository.findOne(id);
            if (!adopcionToEdit) {
                return response.status(404).json({ message: `No se encuentra una adopción con ID ${id}` });
            }
        
            adopcionToEdit.vacunado      = vacunado;
            adopcionToEdit.fechaAdopcion = fechaAdopcion;
            adopcionToEdit.descripcion   = descripcion;
            // TODO: Falta asignar el objeto animal...
            //adopcionToEdit.animal        = animal;
            
            const errorsFormat = await Adopcion.validate(adopcionToEdit);
            if (errorsFormat.length) {
                return response.status(422).json({ message: "Los datos no cumplen con el formato adecuado", details: errorsFormat });
            }

            const adopcionSaved = await adopcionRepository.save(adopcionToEdit);
            return response.status(201).json({ message: 'Adopción modificada.', adopcion: adopcionSaved });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }

}
