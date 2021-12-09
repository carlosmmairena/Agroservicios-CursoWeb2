import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({providedIn:"root"})

export class CrearAnimalesFormGroup{

    constructor(private fb: FormBuilder){

    }

baseForm = this.fb.group({
    id: [''],
    color: ['',[Validators.required]],
    tipo: ['',[Validators.required]],
    peso: ['',[Validators.required]],
    raza: ['',[Validators.required]],
    Descripcion: ['',[Validators.required]],
    estado: ['',[Validators.required]]
});


}