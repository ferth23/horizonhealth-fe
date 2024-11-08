import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { FraseResponse } from '../interfaces/frase-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class EnsenanzaService {
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  getFrase ( user : string ) : Observable < FraseResponse > {
    const url = `${ this.base_url }/api/frases/frases?userId=${ user }`;

    return this.http.get < FraseResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  getFrasePremium ( user : string ) : Observable < FraseResponse > {
    const url = `${ this.base_url }/api/frases/frases/premium?userId=${ user }`;

    return this.http.get < FraseResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }
}
