import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Consejo } from "../entity/Consejo";

export class consejoController {
    static getAll = async (req: Request, res: Response) => {
        const consejoRepo = getRepository(Consejo);

        let lista;

        try {
            lista = await consejoRepo.find({ select: ['id', 'titulo', 'foto'], where: { estado: 1 } });
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

    static getById = async (req: Request, res: Response) => {
        const consejoRepo = getRepository(Consejo);

        const { id } = req.params;

        try {
            const consejo = await consejoRepo.findOneOrFail(id,
                { select: ['id', 'titulo', 'foto'] });

            res.send(consejo);
        }
        catch (error) {
            res.status(404).json({ mensaje: 'No se encontro el consejo!' });
        }

    }

    static new = async (req: Request, res: Response) => {

        const consejoRepo = getRepository(Consejo);
        const { titulo, foto } = req.body;

        let consejo = new Consejo();

        if (!titulo) {
            res.status(404).json({ mensaje: 'Falta el titulo!' });
        }
        if (!foto) {
            res.status(404).json({ mensaje: 'Falta la foto!' });
        }

        consejo.titulo = titulo;
        consejo.foto = foto;
        consejo.estado = true;

        //validacion de decoredares de class validator
        const validateOpt = { validationError: { target: false, value: false } };
        const errores = await validate(consejo, validateOpt);
        //valiado si hay errores
        if (errores.length > 0) {
            return res.status(400).json(errores);
        }

        //guardo
        try {
            await consejoRepo.save(consejo);
        } catch (error) {
            return res.status(409).json({ mensaje: 'El consejo ya existe!' })
        }

        res.status(201).send("consejo almacenado");
    }

    static modify = async (req: Request, res: Response) => {
        const consejoRepo = getRepository(Consejo);
        const { id } = req.params;
        const { titulo, foto } = req.body;
        let consejo;

        try {
            consejo = await consejoRepo.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({ mensaje: 'No se encontro el consejo!' });
        }

        if (!titulo) {
            res.status(404).json({ mensaje: 'Falta el titulo!' });
        }
        if (!foto) {
            res.status(404).json({ mensaje: 'Falta la foto!' });
        }

        consejo.titulo = titulo;
        consejo.foto = foto;
        consejo.estado = true;

        //validacion de decoredares de class validator
        const validateOpt = { validationError: { target: false, value: false } };
        const errores = await validate(consejo, validateOpt);
        //valiado si hay errores
        if (errores.length > 0) {
            return res.status(400).json(errores);
        }

        try {
            await consejoRepo.save(consejo);
        } catch (error) {
            return res.status(409).json({ mensaje: 'Ya existe!' })
        }

        res.status(201).send("consejo modificada!");
    }

    static delete = async (req: Request, res: Response) => {
        const consejoRepo = getRepository(Consejo);
        const { id } = req.params;
        let consejo;

        try {
            consejo = await consejoRepo.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({ mensaje: 'No se encontro el consejo!' });
        }

        consejo.estado = false;

        try {
            await consejoRepo.save(consejo);
        } catch (error) {
            return res.status(409).json({ mensaje: 'Error al eliminar!' });
        }

        res.status(201).send("consejo eliminada!");
    }
}