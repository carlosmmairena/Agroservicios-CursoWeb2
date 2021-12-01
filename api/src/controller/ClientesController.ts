import { validate, ValidateIf } from "class-validator";
import { EDESTADDRREQ } from "constants";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Cliente } from "../entity/Cliente";
import { Persona } from "../entity/Persona";
import { Usuario } from "../entity/Usuarios";


export class ClientesController{
 
  static getAll = async (req:Request, res: Response)=>{ 
      const ClienteRepo = getRepository(Cliente);
      
      let lista;

      try {
          lista = await ClienteRepo.find({select:['id','correo'],where:{estado:1},relations:["persona"]}); 
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
    const ClienteRepo = getRepository(Cliente);
    
      const {id} = req.params;

      

      try {
          const cliente = await ClienteRepo.findOneOrFail(id, 
            {select:['id','correo'], 
          where:{estado:1}, relations:["persona"]});

          res.send(cliente);
      } catch (error) {

        res.status(404).json({mensaje:'No se encontro el usuario!'});

      }

}

static new = async (req:Request, res: Response)=>{
    const ClienteRepo = getRepository(Usuario);

    const {nombre, apellido1,apellido2,fechaNac,correo,password}= req.body;

    let cliente =  new Cliente();
    let persona = new Persona();

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

    persona.nombre= nombre;
    persona.apellido1= apellido1;
    persona.apellido2= apellido2;
    persona.fechaNac= fechaNac;


    cliente.correo= correo;
    cliente.estado= true;

    //aca hacemos el JOIN 
    cliente.persona= persona;

    //Validacion de decoradores de class validator
    const validateOpt = {validationError: {target:false, velue:false}};
    const errores = await validate(cliente, validateOpt);
    //valido si hay error
    if(errores.length > 0){
        return res.status(400).json(errores);
    }


    //guardo
    try {
        await ClienteRepo.save(cliente);
    } catch (error) {
        return res.status(409).json({mensaje: 'El cliente ya existe!'});

    }
    return res.status(409).json({mensaje: 'Cliente Creado!'});


}


}