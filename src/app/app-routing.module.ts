import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },{ 
  path: 'admin', loadChildren: () => import('./pages/auth/admin/admin.module').then(m => m.AdminModule) },{
  path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  { path: 'usuarios', loadChildren: () => import('./pages/pages/usuarios/usuarios.module').then(m => m.UsuariosModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
