import { ReturnStatement } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { ConstruccionService } from 'src/app/shared/services/construccion.service';
import { construFormGroup } from 'src/app/shared/Utils/construForms';

@Component({
  selector: 'app-modal-constru',
  templateUrl: './modal-constru.component.html',
  styleUrls: ['./modal-constru.component.scss']
})
export class ModalConstruComponent implements OnInit {

  nombre="";
  titulo="";
  isNew: boolean=false;
  constructor(@Inject(MAT_DIALOG_DATA)public data: any, 
  public formConstru: construFormGroup,
  private construSrv: ConstruccionService, 
  public dialogRef: MatDialogRef<ModalConstruComponent>)  { }


  ngOnInit(): void {
    if (this.data!.user)
    {
      this.isNew=false;

      this.titulo="Modificar producto";
      this.pathFormData();

    }else{
      this.isNew=true;

      this.titulo="Nuevo producto";
    }

    console.log(this.isNew);
  
  }

  pathFormData():void{

    this.formConstru.baseForm.patchValue({
      id:this.data?.constru?.id,
      producto:this.data?.constru?.producto,
      fragil:this.data?.constru?.fragil,

    })
  }

  guardar():void{
    if (this.formConstru.baseForm.invalid){
      return;
    }
     const constru = this.formConstru.baseForm.value;

     if(this.isNew){
      this.construSrv.save(constru).subscribe((datos)=>{
        alert("Se guardo");
        this.dialogRef.close();
      },(err)=>{
        alert(err);
      });
      
     }else{
      this.construSrv.update(constru).subscribe((datos)=>{
        alert("Se modifico correctamente");
        this.dialogRef.close();
     },(err)=>{
       alert(err);
      });
     }
  }



}
