/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : test.service.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 05/11/2024
 * Descripción   : Servicio para manejar el controlador de test del backend
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 06/11/2024    Humberto Medina Santos    Implementación del método de
 *                                         guardarPuntaje()
 * ---------------------------------------------------------------------------- */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { TestResponse } from '../interfaces/test-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class TestService {

  // * Injección de dependencias y variables de entorno
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  // * Método que manda una petición al backend para guardar el puntaje del usuario
  // * en el test semanal
  guardarPuntaje ( user: string, puntaje : string ) : Observable < TestResponse > {
    const url = `${ this.base_url }/api/test/guardar-puntaje`;
    const body = { user, puntaje };

    return this.http.post < TestResponse > ( url, body )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }
}
