import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({providedIn:"root"})

export class LoginFormsBase{

    constructor(private fb: FormBuilder){

    }

baseForm = this.fb.group({
    correo: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
});

/* isValidField(field: string):boolean{

    this.getErrorMessage(field);
    return (
        (this.baseForm.get(field)?.touched || this.baseForm.get(field)?.dirty) && !this.baseForm.get(field)?.valid
    );

}

private getErrorMessage(field: string): void{
    const {errors}= this.baseForm.get(field)?.value ;
    if(errors){
        const minL = errors?.minLength?.requiredLength;
        const message={
            require:"Es requerido",
            email:"El correo no tiene formato",
            minLength: `Este campo requiere almenos ${minL} caracteres`
        }
    }
} */

}