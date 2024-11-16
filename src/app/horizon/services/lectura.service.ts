/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : lectura.service.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 05/11/2024
 * Descripción   : Servicio para manejar el controlador de lectura del backend
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 06/11/2024    Humberto Medina Santos    Implementación de los métodos
 *                                         getLectura() y getLecturaPremium()
 * ---------------------------------------------------------------------------- */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LecturaResponse } from '../interfaces/lectura-response.interface';
import { LecturasPreResponse } from '../interfaces/lecturasPre-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class LecturaService {

  // * Injección de dependencias y variables de entorno
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  // * Método que manda una petición al backend para obtener una lectura aleatoria
  // * para los usuarios no premium
  getLectura () : Observable < LecturaResponse > {
    const url = `${ this.base_url }/api/lecturas/lecturas`;

    return this.http.get < LecturaResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  // * Método que manda una petición al backend para obtener una lectura aleatoria
  // * para los usuarios premium
  getLecturaPremium ( user : string ) : Observable < LecturasPreResponse > {
    const url = `${ this.base_url }/api/lecturas/lecturas/premium?userId=${ user }`;

    return this.http.get < LecturasPreResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }
}
