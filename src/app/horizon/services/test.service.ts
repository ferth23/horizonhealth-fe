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
 *
 * 16/11/2024    Humberto Medina Santos    Implementación del método de
 *                                         obtenerPuntajes()
 * ---------------------------------------------------------------------------- */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { TestResponse } from '../interfaces/test-response.interface';
import { TestResultResponse } from '../interfaces/testResult-response.interface';

// * Interface para mapear la respuesta de la petición del método obtenerPuntajes()
interface Result {
  puntaje : number;
  fecha_s : string;
  fecha_d : Date;
}

@Injectable ( {
  providedIn : 'root'
} )
export class TestService {

  // * Injección de dependencias y variables de entorno
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  // * Método que realiza una petición POST al backend para guardar el puntaje
  // * de un test semanal
  guardarPuntaje ( userId: string | null, puntaje : number ) : Observable < TestResponse > {
    const url = `${ this.base_url }/api/test/guardar-puntaje`;
    const body = { userId, puntaje };

    return this.http.post < TestResponse > ( url, body )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

  // * Método que realiza una petición GET al backend para obtener los puntajes
  // * que ha tenido un usuario en sus tests semanales
  obtenerPuntajes ( userId: string | null ) : Observable < Result[] > {
    const url = `${ this.base_url }/api/test/resultados-test/${ userId }`;

    return this.http.get < TestResultResponse[] > ( url )
      .pipe (
        map ( results => results.map ( result => ( {
          puntaje : result.puntaje,
          fecha_s : new Date ( result.fecha_test ).toDateString(),
          fecha_d : result.fecha_test
        } ) ) ),
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }
}
