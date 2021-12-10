import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { CrearAnimalesFormGroup } from 'src/app/shared/Utils/CrearAnimalesFormGroup';

@Component({
  selector: 'app-crearanimal',
  templateUrl: './crearanimal.component.html',
  styleUrls: ['./crearanimal.component.scss']
})
export class CrearanimalComponent implements OnInit {

  tipo="";
  titulo="";
  isNew: boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA)public data:any,
  public formCrear: CrearAnimalesFormGroup,
  private animalService: AnimalService,
  public dialogRef: MatDialogRef<CrearanimalComponent>

  ) { }

  ngOnInit(): void {
    if(this.data!.user)
    {
      this.isNew = false;
      this.titulo="modificar Animal";
      this.pathFormData();
    }else{
      this.isNew = true;
      this.titulo="Nuevo Animal";
    }
  }

  

  guardar(): void{
    if(this.formCrear.baseForm.invalid)
    return;

    const animal =  this.formCrear.baseForm.value;

    if (this.isNew) {
      this.animalService.save(animal).subscribe((datos)=>{
        alert("Se Guardo con exito");
        this.dialogRef.close();
        this.formCrear.baseForm.reset();
      },(err)=>{
        alert(err);
      });
    }else{
      this.animalService.update(animal).subscribe((datos)=>{
        alert("Se Modifico con exito");
        this.dialogRef.close();
        this.formCrear.baseForm.reset();
      },(err)=>{
        alert(err);
      });
    }
    
  
    
  }

  pathFormData():void{
   this.formCrear.baseForm.patchValue({
     id:this.data?.user?.id,
     color:this.data?.user?.color,
     peso:this.data?.user?.peso,
     tipo:this.data?.user?.tipo,
     raza:this.data?.user?.raza,
     Descripcion:this.data?.user?.Descripcion,
     estado:this.data?.user?.estado
   });
  }

}
