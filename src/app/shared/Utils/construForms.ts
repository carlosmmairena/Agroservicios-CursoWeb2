import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({providedIn:"root"})

export class construFormGroup{

    constructor(private fb: FormBuilder) { }

    baseForm = this.fb.group({
        id:             [''  ],
        fragil:         ['', [ Validators.required ] ],
        nombre:         ['', [ Validators.required, Validators.minLength(3) ] ],
        descripcion:    ['', [ Validators.required, Validators.minLength(3) ] ],
        marca:          ['', [ Validators.required, Validators.minLength(3) ] ],
        precioUnitario: ['', [ Validators.required ] ],
        stock:          ['', [ Validators.required ] ],
        unidadMedida:   ['', [ Validators.required, Validators.minLength(1) ] ],
        estado:         ['', [ Validators.required ] ],
    });


}