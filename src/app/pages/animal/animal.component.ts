import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Animales } from 'src/app/shared/componets/models/animal.interface';
import { CrearanimalComponent } from './crearanimal/crearanimal.component';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {

  displayedColumns: string[] = ['id','color','tipo','peso','raza','Descripcion','acciones'];
  dataSource: MatTableDataSource<Animales>;

  constructor(private srvAnimal : AnimalService, private dialog: MatDialog ) { 
    this.dataSource = new MatTableDataSource(null!);
  }


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

  refreshList():void{
    this.srvAnimal.getAll().subscribe((lista)=>{
      this.dataSource.data=lista;
    });
  }


  openModal(user=null):void{
    
    console.log(user);

   let modal = this.dialog.open(CrearanimalComponent,{
     height:'700px',
     width: '600px',
     data:{user}
   });

   modal.afterClosed().subscribe((datos)=>{
     this.refreshList();
   })

  }

  delete(id: number):void{
    this.srvAnimal.delete(id).subscribe((values)=>{
     alert("Usuario eliminado");
     this.refreshList();

    }, ( error)=>{
      console.log(error);
    });
  }


}
