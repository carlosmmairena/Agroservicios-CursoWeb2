import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeterinarioRoutingModule } from './veterinario-routing.module';
import { VeterinarioComponent } from './veterinario.component';


@NgModule({
  declarations: [
    VeterinarioComponent
  ],
  imports: [
    CommonModule,
    VeterinarioRoutingModule
  ]
})
export class VeterinarioModule { }
