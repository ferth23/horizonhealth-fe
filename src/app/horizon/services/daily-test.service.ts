/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : actividades.service.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 19/11/2024
 * Descripción   : Servicio para manejar las peticiones relacionadas con el test diario
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 19/11/2024    Humberto Medina Santos    Implementación de los métodos
 *                                         guardarFecha() y obtenerFechaTest()
 * ---------------------------------------------------------------------------- */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DailyTestResponse } from '../interfaces/dailyTest-response.interface';
import { DailyTestDateResponse } from '../interfaces/dailyTestDate-response.interface';

@Injectable({
  providedIn: 'root'
})
export class DailyTestService {

  // * Injección de dependencias y variables de entorno
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  // * Método que realiza una petición POST al backend para guardar la fecha en la que se hizo el test diario
  guardarFecha ( userId: string | null ) : Observable < DailyTestResponse > {
    const url = `${ this.base_url }/api/test/test-diario/${ userId }`;

    return this.http.put < DailyTestResponse > ( url, {} )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

  // * Método que realiza una petición GET al backend para obtener la fecha en la que se hizo el último test diario
  obtenerFechaTest ( userId: string | null ) : Observable < DailyTestDateResponse > {
    const url = `${ this.base_url }/api/test/test-diario/${ userId }`;

    return this.http.get < DailyTestDateResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }
}
