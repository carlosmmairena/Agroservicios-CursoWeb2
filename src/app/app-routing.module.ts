import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './pages/animal/animal.component';
import { AdminComponent } from './pages/auth/admin/admin.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProformasComponent } from './pages/proformas/proformas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: '',          component: HomeComponent      },
  { path: 'login',     component: LoginComponent     },
  { path: 'admin',     component: AdminComponent     },
  { path: 'home',      component: HomeComponent      },
  { path: 'usuarios',  component: UsuariosComponent  },
  { path: 'proformas', component: ProformasComponent },
  { path: 'animal',    component: AnimalComponent    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
