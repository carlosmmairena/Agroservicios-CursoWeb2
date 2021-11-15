import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({providedIn:"root"})

export class LoginFormBase{

constructor(private fb: FormBuilder){

}

baseForm = this.fb.group({
 correo: ['',[Validators.required, Validators.email]],
 password: ['',[Validators.required, Validators.minLength(6)]],
});

/*isValidField(field: string): boolean{
 this.getErrorMessage(field);
 return (
     (this.baseForm.get(field)?.touched !! this.baseForm.get(field)?.dirty) && !this.baseForm.get(field)?.valid
 );

}

private getErrorMessage(field: string): void{
const { errors }= this.baseForm.get(field)?.value;
//Si encuentra errores entra al if
if(errors){
    //Mensaje sobre los campos login, al momento que no cumplen con el formato correspondiente.
    const minL = errors?.minLength?.requiredLenght;

    const message={
        required:"Este campo es requerido",
        email: "Debe escribir un correo, con el formato correcto",
        minLength: `Este campo necesita ${minL} caracteres`
    }
}
}
*/

}