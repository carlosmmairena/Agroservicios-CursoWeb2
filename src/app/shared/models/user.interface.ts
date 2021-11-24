export interface User{
    correo: string;
    password: string;
}

export interface UserResponse{
    mensaje: string;
    token: string;
}