import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({providedIn:"root"})

export class construFormGroup{

constructor(private fb: FormBuilder){

}

baseForm = this.fb.group({
 producto: ['',[Validators.required, Validators.minLength(30)]],
 fragil: ['',[Validators.required, Validators.minLength(30)]],
});


}