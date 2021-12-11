import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Clientes } from 'src/app/shared/models/clientes.interface';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-Clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email'];
  dataSource: MatTableDataSource<Clientes>;
/*
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
*/

  constructor(private srvClientes : ClientesService) {

    this.dataSource = new MatTableDataSource(null!);

   }
/*
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
*/
  ngOnInit(): void {

    this.srvClientes.getAll().subscribe((lista)=>{

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
