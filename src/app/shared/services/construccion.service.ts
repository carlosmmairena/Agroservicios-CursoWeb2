import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Construccion } from 'src/app/shared/models/construccion.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstruccionService {
 
  constructor(private http: HttpClient , private route: Router) { }

  getAll():Observable<Construccion[]> {
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token', token);
    
    return this.http.get<Construccion[]>(`${environment.URL}/producto/construcciones`, { headers: header }).pipe(catchError(this.handleError));
  }
  handleError(error: any): Observable<never>{

    console.log(error);
    let mensajeError= 'Error desconocido';

    if(error){
      mensajeError=`Error: ${error.error.mensaje}`
    }

    return throwError(mensajeError);
  }

  delete(id:number):Observable<{}>{
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token', token);

    return this.http.delete<any>(`${environment.URL}/construccion/${id}`,{headers:header}).pipe(catchError(this.handleError));
  }

  save(constru: Construccion):Observable<any>{
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token', token);

    return this.http.post<any>(`${environment.URL}/construccion/`,constru, { headers: header }).pipe(catchError(this.handleError));
  }

  update(constru: Construccion):Observable<any>{
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token', token);

    return this.http.patch<any>(`${environment.URL}/construccion/${constru.id}`,constru, { headers: header }).pipe(catchError(this.handleError));
  }

}
