import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig";

export const checkJWT = (request: Request, response: Response, next: NextFunction) => {

    const apiToken = <string>request.headers['api_token'];
    let payload: any;

    try {
        payload = jwt.verify(apiToken, jwtConfig.jwtSecretKey);

    } catch (error) {
        return response.status(401).json({message: 'No autorizado.'});
    }

    // TODO: falta expirar el token anterior...
    const { userId, email } = payload;
    const newToken = jwt.sign({ userId: userId, email: email }, jwtConfig.jwtSecretKey, { expiresIn: '5m' });

    response.setHeader('api_token', newToken);
    next();
    
}
