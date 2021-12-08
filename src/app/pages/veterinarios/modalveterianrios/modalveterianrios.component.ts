import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VeterinariosService } from 'src/app/shared/services/veterinarios.service';
import { VeterinariosFormGroup } from 'src/app/shared/Utils/veterinariosForm';

@Component({
  selector: 'app-modalveterianrios',
  templateUrl: './modalveterianrios.component.html',
  styleUrls: ['./modalveterianrios.component.scss']
})
export class ModalveterianriosComponent implements OnInit {

  tipoAnimal="";
  mensaje="";
  isNew: boolean= false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public formVeterinarios: VeterinariosFormGroup,
  private veterinarioSrv: VeterinariosService,
  public dialogRef: MatDialogRef<ModalveterianriosComponent>
  ) { }

  ngOnInit(): void {
    //this.tipoAnimal= this.data?.veteri?.tipoAnimal;
    if(this.data!.veteri){

      this.isNew=false;

      this.mensaje="Modificar";
      this.pathFormData();
    }else{

      this.isNew=true
      this.mensaje="Nuevo"
      this.formVeterinarios.reset();
    }
    console.log(this.isNew)
  }
  pathFormData():void{
    this.formVeterinarios.baseForm.patchValue({
      id:this.data?.veteri?.id,
      tipoAnimal:this.data?.veteri?.tipoAnimal,
     idProducto:this.data?.veteri?.idProducto,
    });
  }
  guardar():void{
    
    //Si esta invalido retorne un error
    if (this.formVeterinarios.baseForm.invalid)
    return;

    const veterina= this.formVeterinarios.baseForm.value;
    const vete= this.formVeterinarios.basForm.value;

    //Dato Nuevo
    if(this.isNew){
      this.veterinarioSrv.save(veterina).subscribe((datos)=>{
        alert("Se guardo");
        this.dialogRef.close();
  
      },(err)=>{
        alert(err);
      });
      //Dato Actualzado
    }else{
      this.veterinarioSrv.update(veterina).subscribe((datos)=>{
        alert("Se modifico");
        this.dialogRef.close();
  
      },(err)=>{
        alert(err);
      });
    }

    
}
}
