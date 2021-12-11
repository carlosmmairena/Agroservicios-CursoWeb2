import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeterinariosComponent } from './veterinarios.component';

const routes: Routes = [{ path: '', component: VeterinariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeterinariosRoutingModule { }
