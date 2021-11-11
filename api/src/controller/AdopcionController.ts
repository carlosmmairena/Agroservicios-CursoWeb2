import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Adopcion } from "../entity/Adopcion";

export class AdopcionController {
    static all = async (req: Request, res: Response) => {
        const adopcionRepo = getRepository(Adopcion);

        let lista;

        try {
            lista = await adopcionRepo.find({ select: ['id', 'vacunado', 'fechaAdopcion', 'descripcion'], where: { estado: 1 } });
        }
        catch (error) {
            res.status(404).json({ mensaje: 'Algo fue mal!' });
        }

        if (lista.length > 0) {
            res.send(lista);
        } else {
            res.status(404).json({ mensaje: 'No hay resultados!' });
        }
    }

    static findById = async (req: Request, res: Response) => {
        const adopcionRepo = getRepository(Adopcion);

        const { id } = req.params;

        try {
            const adopcion = await adopcionRepo.findOneOrFail(id,
                { select: ['id', 'vacunado', 'fechaAdopcion', 'descripcion'] });

            res.send(adopcion);
        }
        catch (error) {
            res.status(404).json({ mensaje: 'No se encontro el adopcion!' });
        }

    }

    static save = async (req: Request, res: Response) => {

        const adopcionRepo = getRepository(Adopcion);
        const { vacunado, fechaAdopcion, descripcion} = req.body;

        let adopcion = new Adopcion();

        if (!vacunado) {
            res.status(404).json({ mensaje: 'Falta la vacunacion!' });
        }
        if (!fechaAdopcion) {
            res.status(404).json({ mensaje: 'Falta fechaAdopcion!' });
        }
        if (!descripcion) {
            res.status(404).json({ mensaje: 'Falta la descripcion!' });
        }

        adopcion.vacunado = vacunado;
        adopcion.fechaAdopcion = fechaAdopcion;
        adopcion.descripcion = descripcion;

        //validacion de decoredares de class validator
        const validateOpt = { validationError: { target: false, value: false } };
        const errores = await validate(adopcion, validateOpt);
        //valiado si hay errores
        if (errores.length > 0) {
            return res.status(400).json(errores);
        }

        //guardo
        try {
            await adopcionRepo.save(adopcion);
        } catch (error) {
            return res.status(409).json({ mensaje: 'El adopcion ya existe!' })
        }

        res.status(201).send("adopcion almacenado");
    }

    static modify = async (req: Request, res: Response) => {
        const adopcionRepo = getRepository(Adopcion);
        const { id } = req.params;
        const { vacunado, fechaAdopcion, descripcion } = req.body;
        let adopcion;

        try {
            adopcion = await adopcionRepo.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({ mensaje: 'No se encontro el adopcion!' });
        }

        if (!vacunado) {
            res.status(404).json({ mensaje: 'Falta el vacunado!' });
        }
        if (!fechaAdopcion) {
            res.status(404).json({ mensaje: 'Falta fechaAdopcion!' });
        }
        if (!descripcion) {
            res.status(404).json({ mensaje: 'Falta la descripcion!' });
        }

        adopcion.vacunado = vacunado;
        adopcion.fechaAdopcion = fechaAdopcion;
        adopcion.descripcion = descripcion;

        //validacion de decoredares de class validator
        const validateOpt = { validationError: { target: false, value: false } };
        const errores = await validate(adopcion, validateOpt);
        //valiado si hay errores
        if (errores.length > 0) {
            return res.status(400).json(errores);
        }

        try {
            await adopcionRepo.save(adopcion);
        } catch (error) {
            return res.status(409).json({ mensaje: 'Ya existe!' })
        }

        res.status(201).send("adopcion modificada!");
    }

}
