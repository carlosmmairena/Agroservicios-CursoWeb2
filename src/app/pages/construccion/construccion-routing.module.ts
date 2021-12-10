import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstruccionComponent } from './construccion.component';

const routes: Routes = [{ path: '', component: ConstruccionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstruccionRoutingModule { }
