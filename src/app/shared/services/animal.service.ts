import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Animales } from '../models/animal.interface';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {
 

  constructor(private http: HttpClient, private route: Router) { }

 
  getAll():Observable<Animales[]>{
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token',token)!;

    return this.http.get<Animales[]>(`${environment.URL}/animal`, { headers: header }).pipe(catchError(this.handleError));
  }

  save(animal : Animales): Observable<any>{
    const token = localStorage.getItem('userToken');
    const header = new HttpHeaders().set('api_token', token!);

    return this.http.post<Animales[]>(`${environment.URL}/animal`,animal, { headers: header }).pipe()
  }

  update(animal : Animales ):Observable<any>{
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token',token);

    return this.http.patch<any>(`${environment.URL}/animal/${animal.id}`, animal, {headers: header}).pipe(catchError(this.handleError));
  }


  delete(id:number):Observable<any>{
    var token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token',token);
    
    return this.http.delete<any>(`${environment.URL}/animal/${id}`,{headers: header}).pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never>{
 
    console.log(error);
    let mensajeError='Error desconocido';
    if(error?.error?.mensaje){
      mensajeError=`Error: ${error.error.mensaje}`;
    }
   
    return throwError(mensajeError);
  }

}
