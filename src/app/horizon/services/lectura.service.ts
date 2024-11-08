import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LecturaResponse } from '../interfaces/lectura-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class LecturaService {
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  getLectura () : Observable < LecturaResponse > {
    const url = `${ this.base_url }/api/lecturas/lecturas`;

    return this.http.get < LecturaResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  getLecturaPremium ( user : string ) : Observable < LecturaResponse > {
    const url = `${ this.base_url }/api/lecturas/lecturas/premium?userId=${ user }`;

    return this.http.get < LecturaResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }
}
