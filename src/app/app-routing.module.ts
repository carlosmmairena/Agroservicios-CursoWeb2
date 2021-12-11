import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './pages/animal/animal.component';
import { AdminComponent } from './pages/auth/admin/admin.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProformasComponent } from './pages/proformas/proformas.component';
import { VeterinariosComponent } from './pages/veterinarios/veterinarios.component';
import { ConstruccionComponent } from './pages/construccion/construccion.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  { path: '',          component: HomeComponent      },
  { path: 'login',     component: LoginComponent     },
  { path: 'admin',     component: AdminComponent     },
  { path: 'home',      component: HomeComponent      },
  { path: 'usuarios',  component: UsuariosComponent  },
  { path: 'cliente',   component: ClientesComponent  },
  { path: 'proformas', component: ProformasComponent },
  { path: 'veterinarios',   component: VeterinariosComponent },
  { path: 'animal',         component: AnimalComponent       },
  { path: 'construcciones', component: ConstruccionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
