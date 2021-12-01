import { Component, OnInit } from '@angular/core';
import { VeterinarioService } from 'src/app/shared/services/veterinario.service';

@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.scss']
})
export class VeterinarioComponent implements OnInit {

  constructor(private srvVeterinario: VeterinarioService) { }

  ngOnInit(): void {

    this.srvVeterinario.getAll().subscribe((lista)=>{
      console.log(lista);
    });
  }

}
