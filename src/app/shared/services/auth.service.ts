import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../componets/models/user.interface';
import {map, catchError} from 'rxjs/operators'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient , private route: Router) { }

  onLogin(userData: User):Observable<UserResponse> {

    //Ver que llega del UserData
    console.log(userData);
    return this.http.post<UserResponse>(`${environment.URL}/auth/login`,userData).pipe(
      
      //Acá viene la repuesta asincronica del server
      map((user: UserResponse)=>{

        //Llamamos el saveStorage y le pasamos el user
        this.saveStorage(user);

        //guardar token en localstorage
        return user;

      }),catchError((err)=>this.handleError(err)

      )

    ); 

  }

  
  onlogout():void{
    //Accede al localstorage y remueve un item usertoken
    localStorage.removeItem('userToken');

    //Depues de eliminado que valla al login
    this.route.navigate(['login']);
  }

  //Extrae el token 
  saveStorage(user: UserResponse):void{

    const {token}=user;

    //Almacenamos el token en el localstorage
    localStorage.setItem('userToken',token);
  }

  handleError(error: any): Observable<never>{

    let mensajeError= 'Error desconocido';

    if(error){
      mensajeError=`Error: ${error.error.mensaje}`
    }

  return throwError(mensajeError);
  }
}
