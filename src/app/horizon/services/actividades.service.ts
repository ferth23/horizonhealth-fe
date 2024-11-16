/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : actividades.service.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 05/11/2024
 * Descripción   : Servicio para manejar el controlador de actividades del backend
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 06/11/2024    Humberto Medina Santos    Implementación de los métodos
 *                                         getActividad() y getActividadPremium()
 * ---------------------------------------------------------------------------- */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ActividadResponse } from '../interfaces/actividad-response.interface';
import { ActividadPreResponse } from '../interfaces/actividadPre-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class ActividadesService {

  // * Injección de dependencias y variables de entorno
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  // * Método que manda una petición al backend para obtener una actividad aleatoria
  // * para los usuarios no premium
  getActividad () : Observable < ActividadResponse > {
    const url = `${ this.base_url }/api/actividades/actividades`;

    return this.http.get < ActividadResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  // * Método que manda una petición al backend para obtener una actividad aleatoria
  // * para los usuarios premium
  getActividadPremium ( user : string ) : Observable < ActividadPreResponse > {
    const url = `${ this.base_url }/api/actividades/actividades/premium?userId=${ user }`;

    return this.http.get < ActividadPreResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }
}
