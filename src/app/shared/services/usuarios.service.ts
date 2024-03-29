import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private route: Router) { }


  getAll():Observable<Usuarios[]>{
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token', token);
    
    return this.http.get<Usuarios[]>(`${environment.URL}/usuario`, { headers: header }).pipe(catchError(this.handleError));
    
  }

  handleError(error: any): Observable<never>{
 
    let mensajeError='Error desconocido';
    if(error){
      mensajeError=`Error: ${error.error.mensaje}`;
    }
    return throwError(mensajeError);
  }


}
