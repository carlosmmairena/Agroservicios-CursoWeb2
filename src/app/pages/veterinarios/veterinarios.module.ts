import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeterinariosRoutingModule } from './veterinarios-routing.module';
import { VeterinariosComponent } from './veterinarios.component';
import { MaterialModule } from 'src/app/material.module';

import { ModalveterianriosComponent } from './modalveterianrios/modalveterianrios.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VeterinariosComponent,
    ModalveterianriosComponent
  ],
  imports: [
    CommonModule,
    VeterinariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class VeterinariosModule { }
