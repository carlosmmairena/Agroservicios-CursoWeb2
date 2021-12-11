import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user.interface';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private user = new BehaviorSubject<UserResponse>(null!);

  get user$(): Observable<UserResponse>{
    return this.user.asObservable();
  }

  constructor(private http: HttpClient, private route: Router) { }
  
  onLogin(userData: User): Observable<UserResponse> {

    console.log(userData);
    return this.http.post<UserResponse>(`${environment.URL}/auth/login`, userData).pipe(
      
      map((user: UserResponse)=>{
     
        this.saveStorage(user);
        this.user.next(user);
        return user;

      }),catchError((err)=>this.handleError(err)
       )


    );

  }

  onlogout():void{
    localStorage.removeItem('userToken');
    this.user.next(null!);
    this.route.navigate(['login']);
  }


  saveStorage(user: UserResponse): void{
    const { yourToken } = user;
    localStorage.setItem('userToken', yourToken);
  }

  
  handleError(error: any): Observable<never>{
 
    let mensajeError='Error desconocido';
    if(error){
      mensajeError=`Error: ${error.error.mensaje}`;
    }
    return throwError(mensajeError);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('userToken')? true : false;
  }

}
