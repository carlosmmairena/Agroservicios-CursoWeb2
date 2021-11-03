import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Usuario } from "../entity/Usuario";
import { Persona } from "../entity/Persona";

export class UsuarioController {

    static all = async (request: Request, response: Response) => {
        const userRepository = getRepository(Usuario);
        const users = await userRepository.find({ select: ['id', 'fechaRegistro', 'correo', 'persona', 'estado'] , where: { estado: true }});
        
        if (users.length < 1) {
            return response.status(404).json({ message: 'No hay usuarios registrados.' });
        }

        return response.status(200).json(users);
    }


    static one = async (request: Request, response: Response) => {
        const userRepository = getRepository(Usuario);
        const user = await userRepository.findOneOrFail(request.params.id);
        
        response.status(200).json(user);
    }


    static save = async (request: Request, response: Response) => {
        try {
            const usuarioRepository = getRepository(Usuario);
            const { correo, password, fechaNacimiento, nombre, apellido1, apellido2 } = request.body;
            
            const dataValidated = Usuario.checkData({ correo, password, fechaNacimiento, nombre, apellido1, apellido2 });
            
            if (dataValidated.hasErrors) {
                return response.status(422).json({ message: "Los siguientes campos están mal", errors: dataValidated.errors });
            }

            const anotherUser = await usuarioRepository.findOne({ select: ['id', 'correo'], where: {correo: correo} });
            if(anotherUser) {
                return response.status(422).json({ message: `Ya existe otro usuario con el correo ${correo}`});
            }


            const usuarioAGuardar         = new Usuario();
            usuarioAGuardar.correo        = correo;
            usuarioAGuardar.estado        = true;
            usuarioAGuardar.fechaRegistro = new Date();
            usuarioAGuardar.password      = password;
            usuarioAGuardar.hashPassword();
    
            const persona     = new Persona();
            persona.nombre    = nombre;
            persona.apellido1 = apellido1;
            persona.apellido2 = apellido2;
            persona.fechaNac  = fechaNacimiento;

            const formatoDatosUsuarioValidado = await Usuario.validate(usuarioAGuardar);
            const formatoDatosPersonaValidado = await Persona.validate(persona);

            if (formatoDatosUsuarioValidado.length || formatoDatosPersonaValidado.length) {
                return response.status(422).json(
                    { message: "Los datos no cumplen con el formato adecuado", 
                    details: [formatoDatosUsuarioValidado, formatoDatosPersonaValidado]}
                )
            }

            const personaRepository = getRepository(Persona);
            await personaRepository.save(persona);

            usuarioAGuardar.persona = persona;
            const usuarioGuardado = await usuarioRepository.save(usuarioAGuardar);
            return response.status(201).json({ message: 'Usuario registrado', usuario: usuarioGuardado });

        } catch (error) {
            return response.status(503).json({ message: "Algo ha fallado...", errors: error });
        }
    }


    static remove = async (request: Request, response: Response) => {
        const userRepository = getRepository(Usuario);
        let userToRemove = await userRepository.findOne(request.params.id);
        const removed = await userRepository.remove(userToRemove);

        return response.status(200).json(removed);
    }

}
