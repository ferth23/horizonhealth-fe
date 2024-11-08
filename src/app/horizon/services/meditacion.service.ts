import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { MeditacionResponse } from '../interfaces/meditacion-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class MeditacionService {
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  getMeditaciones ( user : string ) : Observable < MeditacionResponse > {
    const url = `${ this.base_url }/api/meditacion/meditacion?userId=${ user }`;

    return this.http.get < MeditacionResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }
}
