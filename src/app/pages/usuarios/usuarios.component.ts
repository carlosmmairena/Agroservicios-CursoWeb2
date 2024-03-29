import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Usuarios } from 'src/app/shared/models/usuarios.interface';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-Usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'email', 'registro'];
  dataSource: MatTableDataSource<Usuarios>;
/*
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
*/

  constructor(private srvUsuarios : UsuariosService) {

    this.dataSource = new MatTableDataSource(null!);

   }
/*
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
*/
  ngOnInit(): void {

    this.srvUsuarios.getAll().subscribe((lista)=>{

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

}
