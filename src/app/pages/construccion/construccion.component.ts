import { Component, OnInit } from '@angular/core';
import { Construccion } from 'src/app/shared/models/construccion.interface';
import { ConstruccionService } from 'src/app/shared/services/construccion.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog } from '@angular/material/dialog'
import { ModalConstruComponent } from './modal-constru/modal-constru.component';


@Component({
  selector: 'app-construccion',
  templateUrl: './construccion.component.html',
  styleUrls: ['./construccion.component.scss']
})
export class ConstruccionComponent implements OnInit {

  displayedColumns: string[] = ['id', 'producto', 'fragil', 'precio','acciones'];
  dataSource: MatTableDataSource<Construccion>;

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  
  constructor(private srvConstruccion: ConstruccionService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(null!);
  }

  //ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  //}

  ngOnInit(): void {

  this.refreshList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id:number):void{
    
    this.srvConstruccion.delete(id).subscribe((products)=>{
      alert("Eliminado")
      this.refreshList();
    }, (error)=>{
      console.log(error);
    });
    this.refreshList();
  }

  refreshList():void{
    this.srvConstruccion.getAll().subscribe((products)=>{

      this.dataSource.data=products;
    });
  }
  openModal(constru ={}):void{

    let modal= this.dialog.open(ModalConstruComponent,{
      height: '700px',
      width: '600px',
      data:{constru}
    });
    modal.afterClosed().subscribe((datos)=>{

      this.refreshList();
    });
  }
}
