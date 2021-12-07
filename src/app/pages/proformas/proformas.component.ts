import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Proforma } from 'src/app/shared/models/proforma.interface';
import { ProformasService } from 'src/app/shared/services/proformas.service';

@Component({
  selector: 'app-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.scss']
})
export class ProformasComponent implements OnInit, AfterViewInit {

  public proformas: Proforma[];
  public displayedColumns: string[] = ['id', 'fechaEmision', 'cancelada', 'cliente'];
  public dataSource: MatTableDataSource<Proforma>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private serviceProformas: ProformasService) {
    this.serviceProformas = serviceProformas;
    this.proformas        = [];
    this.dataSource       = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadProformas();
  }


  private loadProformas() {
    this.serviceProformas.getProformas$().subscribe((values) => {
      this.proformas       = values;
      this.dataSource.data = this.proformas;
      console.log(values);
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
