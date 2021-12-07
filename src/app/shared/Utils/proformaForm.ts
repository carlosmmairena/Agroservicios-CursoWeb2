import { Injectable              } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({ providedIn:"root" })

export class ProformaFormGroup {

    public baseForm = this.fb.group({
        id:                  [''],
        idCliente:           ['', [ Validators.required,  Validators.minLength(2), Validators.min(1)] ],
        formaPago:           ['', [ Validators.required ]                                             ],
        porcentajeDescuento: ['', [ Validators.required, Validators.min(0), Validators.max(100)]      ],
        canceled:            ['', [ Validators.required ]                                             ]
    });


    constructor(private fb: FormBuilder){ }

}