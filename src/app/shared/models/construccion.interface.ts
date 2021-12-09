//import { Producto } from "api/src/entity/Producto";

export interface Construccion{
    mensaje: string;
    token: string;

    id: number,
    producto: string,
    fragil: boolean
}