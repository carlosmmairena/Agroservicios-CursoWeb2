import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { isNull, isUndefined } from "util";
import { Animal } from "../entity/Animal";



export class AnimalController{

    static getAll = async (req:Request, res: Response)=>{ 
        const AnimalRepo = getRepository(Animal);
        
        let lista;
  
        try {
            lista = await AnimalRepo.find({select:['id','tipo','color','peso','raza','Descripcion'],where:{estado:1}}); 
        } catch (error) {
  
          res.status(404).json({mensaje:'Algo fue mal!'});
  
        }
  
        if(lista.length > 0){
            res.send(lista);
        }else{
          res.status(201).json({mensaje:'No hay resultados!'});
  
        }
  
    }


static new = async (req:Request, res:Response)=>{
    
      const AnimalRepo = getRepository(Animal);

      const {tipo,color,peso,raza,Descripcion,estado}= req.body;

      let newAnimal =  new Animal;

    if(!tipo){
     return res.status(404).json({mensaje:'Falta el Tipo!'});
    }
    if(!color){
     return res.status(404).json({mensaje:'Falta el Color!'});
    }
    if(!peso){
     return res.status(404).json({mensaje:'Falta el Peso!'});
    }
    if(!raza){
     return res.status(404).json({mensaje:'Falta la raza!'});
    }  
    if(!Descripcion){
      return res.status(404).json({mensaje:'Falta el Descripcion!'});
    }
    
    newAnimal.tipo = tipo;
    newAnimal.color = color;
    newAnimal.peso = peso;
    newAnimal.raza = raza;
    newAnimal.Descripcion = Descripcion;
    newAnimal.estado = estado;

    const validateOpt = {validationError: {target:false, velue:false}};
      const errores = await validate(newAnimal, validateOpt);
      //valido si hay error
      if(errores.length > 0){
          console.log(errores);
          return res.status(400).json(errores);
      }

    try{
      await AnimalRepo.save(newAnimal);
    }catch (error){
      return res.status(409).json({mensaje: 'El Animal ya existe'});
    }
     return res.status(201).json({mensaje: 'Animal Creado'});

  }


  static delete = async (req:Request, res: Response)=>{
   const AnimalRepo = getRepository(Animal);
   const {id}= req.params;
   let animal;

   try{
     animal = await AnimalRepo.findOneOrFail(id);
   }catch(error) {
     return res.status(404).json({mensaje: 'El animal no se encuentra'});
   }
    animal.estado=false;

   try{
     await AnimalRepo.save(animal)
   }catch (error) {
     return res.status(404).json({mensaje: 'Error al eliminar'});
   }
     return res.status(201).json({mensaje: 'Animal Eliminado'});
  }

  


   
}