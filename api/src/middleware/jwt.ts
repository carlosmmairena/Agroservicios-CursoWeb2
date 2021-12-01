import { NextFunction, Response, Request } from "express";
import { Usuario } from "../entity/Usuarios";
import * as jwt from 'jsonwebtoken';
import config from "../config/config";

export const checkJwt = (req:Request, res: Response, next: NextFunction)=>{
    const token = <string>req.headers['auth'];
    let payload; 

    try {
        payload =  jwt.verify(token, config.jwtSecretKey)
        res.locals.jwtPayload= payload;
    } catch (error) {
        return res.status(401).json({mensaje:'No autorizado!'});
    }

    const {userId, correo} = payload;

    const newToken= jwt.sign({userId, correo}, config.jwtSecretKey, {expiresIn: '5min'});

    res.setHeader('auth', newToken);

    next();

}