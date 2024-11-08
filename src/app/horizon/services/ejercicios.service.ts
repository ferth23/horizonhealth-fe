import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { EjerciciosResponse } from '../interfaces/ejercicios-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class EjerciciosService {
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  getEjercicio () : Observable < EjerciciosResponse > {
    const url = `${ this.base_url }/api/ejercicios/ejercicios`;

    return this.http.get < EjerciciosResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  getEjercicioPremium ( user : string ) : Observable < EjerciciosResponse > {
    const url = `${ this.base_url }/api/ejercicios/ejercicios/premium?userId=${ user }`;

    return this.http.get < EjerciciosResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }
}
