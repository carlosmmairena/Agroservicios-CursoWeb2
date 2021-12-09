import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { isNullOrUndefined } from "util";
import { Consejo } from "../entity/Consejo";
import { Usuario } from "../entity/Usuario";
import validators from "../utils/validators";

export class ConsejoController {

    static all = async (request: Request, response: Response) => {
        const consejoRepository = getRepository(Consejo);
        const consejo = await consejoRepository.find({ select: ['id', 'titulo', 'foto', 'estado'], loadEagerRelations: true });

        if (consejo.length < 1) {
            return response.status(404).json({ message: 'No hay consejos registrados.' });
        }

        return response.status(200).json(consejo);
    }


    static one = async (request: Request, response: Response) => {
        const { id } = request.params;
        const consejoRepository = getRepository(Consejo);
        const consejo = await consejoRepository.findOne({ select: ['id', 'titulo', 'foto','estado'], where: { id: id },  loadEagerRelations: true  } );

        if (!consejo) {
            return response.status(404).json({ message: `No existe un consejo con id ${id}` });
        }

        return response.status(200).json(consejo);
    }


    static save = async (request: Request, response: Response) => {
        try {
            const consejoRepository = getRepository(Consejo);
            const { idUsuario, titulo, foto, estado } = request.body;

            const dataValidated = Consejo.checkData({ idUsuario, titulo, foto, estado });

            if (dataValidated.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataValidated.errors });
            }
            const userRepository = getRepository(Usuario);
            const usuario = await userRepository.findOne({ select: ['id','estado'], where: {id: idUsuario} });
            if(isNullOrUndefined(usuario)) {
                return response.status(422).json({ message: `No existe este usuario con este id ${idUsuario}`});
            }

            const consejoAGuardar = new Consejo();
            consejoAGuardar.usuario = usuario;
            consejoAGuardar.titulo = titulo;
            consejoAGuardar.foto   = foto;
            consejoAGuardar.estado = true;
           
            const formatoDatosConsejoValidado = await validators.validateEntity(consejoAGuardar);

            if (formatoDatosConsejoValidado.length) {
                return response.status(422).json(
                    {
                        message: "Los datos no cumplen con el formato adecuado",
                        details: formatoDatosConsejoValidado
                    }
                )
            }

            const ConsejoSaved = await consejoRepository.save(consejoAGuardar);
           
            return response.status(201).json({ message: 'Consejo registrado', consejo: ConsejoSaved });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }


    static modify = async (request: Request, response: Response) => {
        try {
            const consejoRepository = getRepository(Consejo);
            const { id } = request.params;
            const { idUsuario, titulo, foto, estado } = request.body;

            const dataValidated = Consejo.checkData({ idUsuario, titulo, foto, estado });

            if (dataValidated.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataValidated.errors });
            }

            const userRepository = getRepository(Usuario);
            const usuario = await userRepository.findOne({ select: ['id','estado'], where: {id: idUsuario} });
            if(isNullOrUndefined(usuario)) {
                return response.status(422).json({ message: `No existe este usuario con este id ${idUsuario}`});
            }

            const consejoAEditar = await consejoRepository.findOne(id);

            if (!consejoAEditar) {
                return response.status(404).json({ message: `No existe un usuario con id ${id}` });
            }

            consejoAEditar.usuario = usuario;
            consejoAEditar.titulo = titulo;
            consejoAEditar.foto   = foto;
            consejoAEditar.estado = true;
           
            const formatoDatosConsejoValidado = await validators.validateEntity(consejoAEditar);

            if (formatoDatosConsejoValidado.length) {
                return response.status(422).json(
                    {
                        message: "Los datos no cumplen con el formato adecuado",
                        details: formatoDatosConsejoValidado
                    }
                )
            }

            const ConsejoSaved = await consejoRepository.save(consejoAEditar);
           
            return response.status(201).json({ message: 'Consejo modificado', consejo: ConsejoSaved });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }


    static remove = async (request: Request, response: Response) => {

        try {
            const { id } = request.params;
            const consejoRepository = getRepository(Consejo);
            const consejoToRemove = await consejoRepository.findOne(id);

            if (!consejoToRemove) {
                return response.status(404).json({ message: `No existe un consejo con id ${id}` });
            }

            consejoToRemove.estado = false;
            await consejoRepository.save(consejoToRemove);

            return response.status(200).json({ message: 'Consejo eliminado' });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }

    }

}