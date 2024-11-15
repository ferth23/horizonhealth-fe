import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { TestResponse } from '../interfaces/test-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class TestService {
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  guardarPuntaje ( user: string | null, puntaje : string ) : Observable < TestResponse > {
    const url = `${ this.base_url }/api/test/guardar-puntaje`;
    const body = { user, puntaje };

    return this.http.post < TestResponse > ( url, body )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }
}
