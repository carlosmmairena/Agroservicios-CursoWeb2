import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Cliente } from "../entity/Cliente";

export class ClienteController {
    static getAll = async (req: Request, res: Response) => {
        const clienteRepo = getRepository(Cliente);

        let lista;

        try {
            lista = await clienteRepo.find({ select: ['id', 'direccion', 'fechaRegistro', 'correo', 'telefono'], where: { estado: 1 } });
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
        const clienteRepo = getRepository(Cliente);

        const { id } = req.params;

        try {
            const cliente = await clienteRepo.findOneOrFail(id,
                { select: ['id', 'direccion', 'fechaRegistro', 'correo', 'telefono'] });

            res.send(cliente);
        }
        catch (error) {
            res.status(404).json({ mensaje: 'No se encontro el cliente!' });
        }

    }

    static new = async (req: Request, res: Response) => {

        const clienteRepo = getRepository(Cliente);
        const { direccion, fechaRegistro, correo, telefono } = req.body;

        let cliente = new Cliente();

        if (!direccion) {
            res.status(404).json({ mensaje: 'Falta la direccion!' });
        }
        if (!fechaRegistro) {
            res.status(404).json({ mensaje: 'Falta la fecha de registro!' });
        }
        if (!correo) {
            res.status(404).json({ mensaje: 'Falta el correo!' });
        }
        if (!telefono) {
            res.status(404).json({ mensaje: 'Falta el telefono!' });
        }


        cliente.direccion = direccion;
        cliente.fechaRegistro = fechaRegistro;
        cliente.correo = correo;
        cliente.telefono= telefono;
        cliente.estado = true;


        //validacion de decoredares de class validator
        const validateOpt = { validationError: { target: false, value: false } };
        const errores = await validate(cliente, validateOpt);
        //valiado si hay errores
        if (errores.length > 0) {
            return res.status(400).json(errores);
        }

        //guardo
        try {
            await clienteRepo.save(cliente);
        } catch (error) {
            return res.status(409).json({ mensaje: 'El cliente ya existe!' })
        }

        res.status(201).send("cliente almacenado");
    }

    static modify = async (req: Request, res: Response) => {
        const clienteRepo = getRepository(Cliente);
        const { id } = req.params;
        const { direccion, fechaRegistro, correo, telefono } = req.body;
        let cliente;

        try {
            cliente = await clienteRepo.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({ mensaje: 'No se encontro el cliente!' });
        }

        if (!direccion) {
            res.status(404).json({ mensaje: 'Falta la direccion!' });
        }
        if (!fechaRegistro) {
            res.status(404).json({ mensaje: 'Falta la fecha de registro!' });
        }
        if (!correo) {
            res.status(404).json({ mensaje: 'Falta el correo!' });
        }
        if (!telefono) {
            res.status(404).json({ mensaje: 'Falta el telefono!' });
        }

        cliente.direccion = direccion;
        cliente.fechaRegistro = fechaRegistro;
        cliente.correo = correo;
        cliente.telefono= telefono;
        cliente.estado = true;


        //validacion de decoredares de class validator
        const validateOpt = { validationError: { target: false, value: false } };
        const errores = await validate(cliente, validateOpt);
        //valiado si hay errores
        if (errores.length > 0) {
            return res.status(400).json(errores);
        }



        try {
            await clienteRepo.save(cliente);
        } catch (error) {
            return res.status(409).json({ mensaje: 'Ya existe!' })
        }

        res.status(201).send("cliente modificada!");
    }


    static delete = async (req: Request, res: Response) => {
        const clienteRepo = getRepository(Cliente);
        const { id } = req.params;
        let cliente;

        try {
            cliente = await clienteRepo.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({ mensaje: 'No se encontro el cliente!' });
        }

        cliente.estado = false;

        try {
            await clienteRepo.save(cliente);
        } catch (error) {
            return res.status(409).json({ mensaje: 'Error al eliminar!' });
        }

        res.status(201).send("cliente eliminada!");
    }


}