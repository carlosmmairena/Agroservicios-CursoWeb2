import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({providedIn:"root"})

export class VeterinariosFormGroup{

    constructor(private fb: FormBuilder){

    }

baseForm = this.fb.group({
    
      // id: ['', [Validators.required, Validators.maxLength(255)]],    
        nombre: ['', [Validators.required, Validators.maxLength(255)]],
        descripcion: ['',[Validators.required, Validators.maxLength(255)]],
        precioUnitario: ['',[Validators.required, Validators.maxLength(255)]],
        marca: ['',[Validators.required, Validators.maxLength(255)]],
        stock: ['',[Validators.required, Validators.maxLength(255)]],
        unidadMedida: ['',[Validators.required, Validators.maxLength(255)]],
        estado: ['',[Validators.required, Validators.maxLength(255)]],
        tipoAnimal: ['',[Validators.required, Validators.maxLength(255)]] 
    
    
    
});

reset(){
 this.baseForm.reset();
}

basForm = this.fb.group({
    
     
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
    
      tipoAnimal: ['',[Validators.required, Validators.maxLength(255)]] 
  
  
  
});


}