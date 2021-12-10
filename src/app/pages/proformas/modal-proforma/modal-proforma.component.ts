import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { Proforma } from 'src/app/shared/models/proforma.interface';
import { ProformasService } from 'src/app/shared/services/proformas.service';
import { ProformaFormGroup } from 'src/app/shared/Utils/proformaForm';

@Component({
  selector: 'app-modal-proforma',
  templateUrl: './modal-proforma.component.html',
  styleUrls: ['./modal-proforma.component.scss']
})
export class ModalProformaComponent implements OnInit {

  public clientes = [ { nombre: 'Carlos', id: 2 }, { nombre: 'Elena', id: 1 } ]

  constructor(
    private proformaService: ProformasService,
    public formProforma:     ProformaFormGroup,
    @Inject(MAT_DIALOG_DATA) public dataProforma: any,
    public dialogRef: MatDialogRef<ModalProformaComponent>
  ) {
    this.proformaService = proformaService;
  }


  ngOnInit(): void {
    if(!this.dataProforma.isNew) {
      this.patchFormData();
    }

    this.dialogRef.afterClosed().subscribe(value => {
      this.formProforma.baseForm.reset();
    })
  }


  private patchFormData() {

    this.formProforma.baseForm.patchValue({
      id:                  this.dataProforma.proforma.id,
      idCliente:           this.dataProforma.proforma.cliente.id,
      formaPago:           this.dataProforma.proforma.formaPago,
      porcentajeDescuento: this.dataProforma.proforma.porcentajeDescuento,
      canceled:            this.dataProforma.proforma.canceled
    });
  }

  /**
   * Guarda los datos del formulario
   * 
   * @returns 
   */
  onSubmit(): boolean {
    
    if (this.formProforma.baseForm.invalid) {
      alert('Los campos no están correctos.');
      return false;
    }

    const datos = this.formProforma.baseForm.value;
    const proforma: Proforma = datos;


    // Modificar o editar
    if (this.dataProforma.isNew) {
      this.registrar(proforma);
    } else {
      this.editar(proforma);
    }

    this.formProforma.baseForm.reset();
    return true;
  }


  /**
   * Modifica una proforma
   * 
   * @param proformaToEdit 
   */
  private editar(proformaToEdit: Proforma) {
    proformaToEdit.idUsuario = parseInt(localStorage.getItem('idUsuario')!);

    this.proformaService.edit(proformaToEdit).subscribe( (values) => {
      
      this.proformaService.notifyNewChanges();
      alert("Proforma modificada");
      console.log(values);
      this.dialogRef.close();
      
    }, (error) => {
      console.error(error.error.message);
      alert(
        `${error.error.message} 
        Revise los campos`
      )
    });
  }


  /**
   * 
   * @param proformaToSave 
   */
  private registrar(proformaToSave: Proforma) {
    this.proformaService.save(proformaToSave).subscribe( (values) => {

      // Llama la función creada en el servicio para reportar cambios de los videos.
      this.proformaService.notifyNewChanges();
      alert("Proforma guardada")
      console.log(values);
      this.dialogRef.close();
      
    }, (error) => {
      console.error(error.error.message);
      alert(
        `${error.error.message} 
        Revise los campos`
      )
    });
  }

}
