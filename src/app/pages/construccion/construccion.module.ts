import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstruccionRoutingModule } from './construccion-routing.module';
import { ConstruccionComponent } from './construccion.component';
import { MaterialModule } from 'src/app/material.module';
import { ModalConstruComponent } from './modal-constru/modal-constru.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConstruccionComponent,
    ModalConstruComponent
  ],
  imports: [
    CommonModule,
    ConstruccionRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ConstruccionModule { }
