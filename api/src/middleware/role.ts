import { json, NextFunction, Request, Response } from "express"
import { getRepository } from "typeorm";
import { Usuarios } from "../entity/Usuarios";

export const  checkRole = (roles: Array<string>)=>{
    return async(req:Request, res:Response, next: NextFunction)=>{

        const{userId}= res.locals.jwtPayload;
        const userRepo = getRepository(Usuarios);
        let user:Usuarios;

        try {
            user= await userRepo.findOneOrFail({where:{id:userId}});
        } catch (error) {
            return res.status(401).json({mensaje:'No autorizado'});
        }


        //chechRoles

        if (roles.includes(user.role)) {
            next();
            
        }else{
            return res.status(401).json({mensaje:'No autorizado'});
        }


        //next();
    }
}