import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Clientes } from '../models/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient, private route: Router) { }


  getAll():Observable<Clientes[]>{
    //pipe recibe el error
    return this.http.get<Clientes[]>(`${environment.URL}/clientes`).pipe(catchError(this.handleError));
    
  }

  handleError(error: any): Observable<never>{
 
    let mensajeError='Error desconocido';
    if(error){
      mensajeError=`Error: ${error.error.mensaje}`;
    }
    return throwError(mensajeError);
  }


}
