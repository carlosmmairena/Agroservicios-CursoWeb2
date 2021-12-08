import { Component, OnInit, ViewChild } from '@angular/core';
import { Veterinarios } from 'src/app/shared/componets/models/veterinarios.interface';
import { VeterinariosService } from 'src/app/shared/services/veterinarios.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ModalveterianriosComponent } from './modalveterianrios/modalveterianrios.component';

@Component({
  selector: 'app-veterinarios',
  templateUrl: './veterinarios.component.html',
  styleUrls: ['./veterinarios.component.scss']
})
export class VeterinariosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'tipoAnimal','nombre', 'acciones' ];
  dataSource: MatTableDataSource<Veterinarios>;


  constructor(private srvVeterinarios : VeterinariosService, private dialog: MatDialog) {

    this.dataSource = new MatTableDataSource(null!);

   }


  ngOnInit(): void {

    this.refreshList();
  }

  //Refresca la lista
  refreshList():void{
    this.srvVeterinarios.getAll().subscribe((lista)=>{

      console.log(lista);
 
      this.dataSource.data=lista;
       
     });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openModal(veteri = null):void{

    // console.log(veteri);

    let modal= this.dialog.open(ModalveterianriosComponent,{
      height: '700px',
      width : '500px',
      data: {veteri}
      
    });
//Refresca la lista despues de Guardar
    modal.afterClosed().subscribe((datos)=>{
      this.refreshList();
    });
  }

  

  delete(id:number):void{
    this.srvVeterinarios.delete(id).subscribe((data)=>{

      this.refreshList();
    });

  }

}
