import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalComponent } from './animal.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearanimalComponent } from './crearanimal/crearanimal.component';


@NgModule({
  declarations: [
    AnimalComponent,
    CrearanimalComponent
  ],
  imports: [
    CommonModule,
    AnimalRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AnimalModule { }
