import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Veterinarios } from '../models/veterinarios.interface';

@Injectable({
  providedIn: 'root'
})
export class VeterinariosService {

  constructor(private http: HttpClient, private route: Router) { }


  getAll():Observable<Veterinarios[]>{
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token',token);

    return this.http.get<Veterinarios[]>(`${environment.URL}/producto/veterinarios`, { headers: header }).pipe(catchError(this.handleError));
  }

  delete(id:number):Observable<any> {
    
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token',token);

    return this.http.delete<any>(`${environment.URL}/producto/${id}`,{ headers: header }).pipe(catchError(this.handleError));
    
  }


  save(veterinar: Veterinarios):Observable<any>{
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token',token);
    
    return this.http.post<any>(`${environment.URL}/producto/veterinario/`,veterinar,{headers:header}).pipe(catchError(this.handleError));
    
  }
  
  update(veterinar: Veterinarios):Observable<any>{
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token',token);
    
    return this.http.put<any>(`${environment.URL}/producto/veterinario/${veterinar.id}`,veterinar,{headers:header}).pipe(catchError(this.handleError));
    
  }


  handleError(error: any): Observable<never>{
 
    let mensajeError='Error desconocido';
    if(error){
      mensajeError=`Error: ${error.error.mensaje}`;
    }
    return throwError(mensajeError);
  }


}
