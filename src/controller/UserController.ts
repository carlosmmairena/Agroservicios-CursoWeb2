import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Usuario } from "../entity/Usuario";

export class UserController {

    static all = async (request: Request, response: Response) => {
        const userRepository = getRepository(Usuario);
        const users = await userRepository.find();
        
        response.status(200).json(users);
    }

    static one = async (request: Request, response: Response) => {
        const userRepository = getRepository(Usuario);
        const user = await userRepository.findOneOrFail(request.params.id);
        
        response.status(200).json(user);
    }

    static save = async (request: Request, response: Response) => {
        const userRepository = getRepository(Usuario);
        const saved = await userRepository.save(request.body);

        response.status(201).json(saved);
    }

    static remove = async (request: Request, response: Response) => {
        const userRepository = getRepository(Usuario);
        let userToRemove = await userRepository.findOne(request.params.id);
        const removed = await userRepository.remove(userToRemove);

        response.status(200).json(removed);
    }

}
