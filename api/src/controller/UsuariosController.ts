import { validate, ValidateIf } from "class-validator";
import { EDESTADDRREQ } from "constants";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Usuario } from "../entity/Usuarios";


export class UsuariosController{
 
  static getAll = async (req:Request, res: Response)=>{ 
      const usuarioRepo = getRepository(Usuario);
      
      let lista;

      try {
          lista = await usuarioRepo.find({select:['id','nombre','apellido1','apellido2','fechaNac','correo'], where:{estado:1}}); 
      } catch (error) {

        res.status(404).json({mensaje:'Algo fue mal!'});

      }

      if(lista.length > 0){
          res.send(lista);
      }else{
        res.status(404).json({mensaje:'No hay resultados!'});

      }

  }

  static getById = async (req:Request, res: Response)=>{
    const usuarioRepo = getRepository(Usuario);
    
      const {id} = req.params;

      

      try {
          const usuario = await usuarioRepo.findOneOrFail(id, {select:['id','nombre','apellido1','apellido2','fechaNac','correo'], 
          where:{estado:1}});

          res.send(usuario);
      } catch (error) {

        res.status(404).json({mensaje:'No se encontro el usuario!'});

      }

}

static new = async (req:Request, res: Response)=>{
    const usuarioRepo = getRepository(Usuario);

    const {nombre,apellido1,apellido2,fechaNac,correo,password}= req.body;

    let usuario =  new Usuario;

    if(!nombre){
        res.status(404).json({mensaje:'Falta el nombre!'});
    }
    if(!apellido1){
        res.status(404).json({mensaje:'Falta el apellido1!'});
    }
    if(!apellido2){
        res.status(404).json({mensaje:'Falta el apellido2!'});
    }
    if(!fechaNac){
        res.status(404).json({mensaje:'Falta la fecha Nacimiento!'});
    }
    if(!correo){
        res.status(404).json({mensaje:'Falta el correo electronico!'});
    }
    if(!password){
        res.status(404).json({mensaje:'Falta el password!'});
    }

    usuario.nombre= nombre;
    usuario.apellido1= apellido1;
    usuario.apellido2= apellido2;
    usuario.fechaNac= fechaNac;
    usuario.correo= correo;
    usuario.password= password;
    usuario.estado= true;

    
    //Validacion de decoradores de class validator
    const validateOpt = {validationError: {target:false, velue:false}};
    const errores = await validate(usuario, validateOpt);
    //valido si hay error
    if(errores.length > 0){
        return res.status(400).json(errores);
    }


    //Incriptar el Password
    usuario.hashPassword();


    //guardo
    try {
        await usuarioRepo.save(usuario);
    } catch (error) {
        return res.status(409).json({mensaje: 'El usuario ya existe!'});

    }
    return res.status(409).json({mensaje: 'Usuario Creado!'});


}

static modify = async (req:Request, res: Response)=>{
    const usuarioRepo = getRepository(Usuario);
    const {id}= req.params;
    const {nombre, apellido1,apellido2,fechaNac,correo,password} = req.body;
    let usuario;

    try {
      usuario = await usuarioRepo.findOneOrFail(id);
    } catch (error) {
        return res.status(404).json({mensaje: 'El usuario no se encuentra!'})
    }
    
    if(!nombre){
        res.status(404).json({mensaje:'Falta el nombre!'});
    }
    if(!apellido1){
        res.status(404).json({mensaje:'Falta el apellido1!'});
    }
    if(!apellido2){
        res.status(404).json({mensaje:'Falta el apellido2!'});
    }
    if(!fechaNac){
        res.status(404).json({mensaje:'Falta la fecha Nacimiento!'});
    }
    if(!correo){
        res.status(404).json({mensaje:'Falta el correo electronico!'});
    }
    if(!password){
        res.status(404).json({mensaje:'Falta el password!'});
    }

    usuario.nombre= nombre;
    usuario.apellido1= apellido1;
    usuario.apellido2= apellido2;
    usuario.fechaNac= fechaNac;
    usuario.correo= correo;
    usuario.password= password;
    usuario.estado = true;

    //Validacion de decoredares de class validatos
    const validateOpt = {validationError: {target:false, velue:false}};
    const errores = await validate(usuario, validateOpt);
    //valido si hay error
    if(errores.length > 0){
        return res.status(400).json(errores);
    }

    //Incriptar el Password
    usuario.hashPassword();

    
    // Guardar
    try {
        await usuarioRepo.save(usuario);
    } catch (error) {
        return res.status(404).json({mensaje: 'El Correo ya existe!'});
    }


   
    res.status(201).send('Usuario Modificado');
}

static delete = async (req:Request, res: Response)=>{
    const usuarioRepo = getRepository(Usuario);
    const {id}= req.params;
    let usuario;

    try {
      usuario = await usuarioRepo.findOneOrFail();
    } catch (error) {
         res.status(404).json({mensaje: 'El usuario no se encuentra!'});
    }
    
    usuario.estado=false;

    try {
        await usuarioRepo.save(usuario)
    } catch (error) {
        return res.status(409).json({mensaje: 'Error al eliminar!'});
    }

    
    res.status(201).send('Usuario eliminado');
}
}