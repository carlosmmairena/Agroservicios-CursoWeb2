import { HttpClient, HttpHeaders         } from '@angular/common/http';
import { Injectable                      } from '@angular/core';
import { Router                          } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError                      } from 'rxjs/operators';
import { environment                     } from 'src/environments/environment';
import { Proforma, ProformasResponse     } from '../models/proforma.interface';

@Injectable({
  providedIn: 'root'
})
export class ProformasService {

  private proformas$: Subject<Proforma[]>;
  private proformas: Proforma[];


  constructor(
    private http:  HttpClient,
    private route: Router,
  ) {
    this.proformas$ = new Subject();
    this.proformas  = [];
    this.notifyNewChanges();
  }


  getProformas$(): Observable<Proforma[]> {
    this.notifyNewChanges();
    return this.proformas$.asObservable();
  }


  save(proformaToSave: Proforma): Observable<any> {
    const token = localStorage.getItem('userToken');
    const header = new HttpHeaders().set('api_token', token!);
    return this.http.post<any>(`${environment.URL}/proforma`, proformaToSave, { headers: header });
  }

  edit(proformaToEdit: Proforma): Observable<any> {
    const token = localStorage.getItem('userToken');
    const header = new HttpHeaders().set('api_token', token!);
    return this.http.put<any>(`${environment.URL}/proforma/${proformaToEdit.id}`, proformaToEdit, { headers: header });
  }

  notifyNewChanges() {
    const token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('api_token', token);
    
    this.http.get<ProformasResponse>(`${environment.URL}/proforma`, { headers: header }).pipe(catchError(this.handleError)).subscribe((values) => {

      this.proformas = values.proformas;
      this.proformas$.next(this.proformas);

    });
  }


  /**
   * Control errors when something try to fetch or push data to an API.
   * 
   * @param error 
   * @returns 
   */
   handleError(error: any): Observable<never>{
    return throwError(error.error);
  }


}
