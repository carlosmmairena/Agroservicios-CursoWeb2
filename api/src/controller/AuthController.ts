import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Usuario } from "../entity/Usuario";
import * as jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig";

export class AuthController {

    static login = async (request: Request, response: Response) => {
        
        const { correo, password } = request.body;

        if (!(correo && password)) {
            return response.status(422).json({message: 'Correo y contraseña son requeridas'});
        }

        try {
            const userRepository = getRepository(Usuario);
            const user = await userRepository.findOne({ correo: correo });

            if (!user || !user.isCorrectPassword(password)) {
                return response.status(401).json({message: 'Correo o contraseña incorrecta'})
            }
            
            const token = jwt.sign({ userId: user.id, email: user.correo }, jwtConfig.jwtSecretKey, {expiresIn: '20m'});
            
            return response.status(200).json({message: 'Usuario autenticado', yourToken: token});
            
        } catch (error) {

            return response.status(503).json({message: 'Algo ha salido mal.', errors: error});
        }

    }
}
