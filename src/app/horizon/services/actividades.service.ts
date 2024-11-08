import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ActividadResponse } from '../interfaces/actividad-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class ActividadesService {
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  getActividad () : Observable < ActividadResponse > {
    const url = `${ this.base_url }/api/actividades/actividades`;

    return this.http.get < ActividadResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  getActividadPremium ( user : string ) : Observable < ActividadResponse > {
    const url = `${ this.base_url }/api/actividades/actividades/premium?userId=${ user }`;

    return this.http.get < ActividadResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }
}
