import { validate, ValidateIf } from "class-validator";
import { EDESTADDRREQ } from "constants";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Raza } from "../entity/Raza";



export class RazaController{

    static getAll = async (req:Request, res: Response)=>{ 
        const RazaRepo = getRepository(Raza);
        
        let lista;
  
        try {
            lista = await RazaRepo.find({select:['nombre'], where:{estado:1}}); 
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
      const RazaRepo = getRepository(Raza);
      
        const {id} = req.params;
  
        try {
            const raza = await RazaRepo.findOneOrFail(id, 
              {select:['nombre'], 
            where:{estado:1}});
  
            res.send(raza);
        } catch (error) {
  
          res.status(404).json({mensaje:'No se encontro la Raza!'});
  
        }
  
  }

  static new = async (req:Request, res: Response)=>{
    const RazaRepo = getRepository(Raza);

    const {idRaza,nombre}= req.body;

    let raza =  new Raza();

    if(!idRaza){
      res.status(404).json({mensaje:'Falta el Id Raza!'});
  }
    if(!nombre){
        res.status(404).json({mensaje:'Falta el nombre!'});
    }
  

  
    raza.nombre= nombre;
    raza.estado = true;



    //Validacion de decoradores de class validator
    const validateOpt = {validationError: {target:false, velue:false}};
    const errores = await validate(raza, validateOpt);
    //valido si hay error
    if(errores.length > 0){
        return res.status(400).json(errores);
    }


    //guardo
    try {
        await RazaRepo.save(raza);
    } catch (error) {
        return res.status(409).json({mensaje: 'La Raza ya existe!'});

    }
    return res.status(409).json({mensaje: 'Raza Creado!'});


}

static modify = async (req:Request, res: Response)=>{
  const RazaRepo = getRepository(Raza);
  const {id}= req.params;
  const {nombre} = req.body;
  let raza;

  try {
    raza = await RazaRepo.findOneOrFail(id);
  } catch (error) {
      return res.status(404).json({mensaje: 'La Raza no se encuentra!'})
  }
  
  if(!nombre){
      res.status(404).json({mensaje:'Falta el nombre!'});
  }
  
  raza.nombre= nombre;
  raza.estado = true;

  //Validacion de decoredares de class validatos
  const validateOpt = {validationError: {target:false, velue:false}};
  const errores = await validate(raza, validateOpt);
  //valido si hay error
  if(errores.length > 0){
      return res.status(400).json(errores);
  }
  
  // Guardar
  try {
      await RazaRepo.save(raza);
  } catch (error) {
      return res.status(404).json({mensaje: 'La raza ya existe!'});
  }


 
  res.status(201).send('Raza Modificado');
}

static delete = async (req:Request, res: Response)=>{
  const RazaRepo = getRepository(Raza);
  const {id}= req.params;
  let raza;

  try {
    raza = await RazaRepo.findOneOrFail(id);
  } catch (error) {
       res.status(404).json({mensaje: 'La Raza no se encuentra!'});
  }
  
   raza.estado=false;

  try {
      await RazaRepo.save(raza)
  } catch (error) {
      return res.status(409).json({mensaje: 'Error al eliminar!'});
  }

  
  res.status(201).send('Raza eliminada');
}
    
}