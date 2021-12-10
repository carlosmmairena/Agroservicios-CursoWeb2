import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/componets/header/header.component';
import { FooterComponent } from './shared/componets/footer/footer.component';
import { MaterialModule } from './material.module';
import { SidebarModule } from './shared/componets/sidebar/sidebar.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnimalComponent } from './pages/animal/animal.component';
import { ProformasComponent } from './pages/proformas/proformas.component';
import { ModalProformaComponent } from './pages/proformas/modal-proforma/modal-proforma.component';
import { CrearanimalComponent } from './pages/animal/crearanimal/crearanimal.component';
import { LoginComponent } from './pages/auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProformasComponent,
    ModalProformaComponent,
    AnimalComponent,
    CrearanimalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
