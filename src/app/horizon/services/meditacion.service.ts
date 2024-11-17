/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : meditacion.service.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 05/11/2024
 * Descripción   : Servicio para manejar el controlador de meditacion del backend
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 06/11/2024    Humberto Medina Santos    Implementación del método de
 *                                         getMeditaciones()
 * ---------------------------------------------------------------------------- */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { MeditacionResponse } from '../interfaces/meditacion-response.interface';
import { GuardarMeditacionResponse } from '../interfaces/guardarmeditacion-response.interface';

interface Meditacion {
  tiempo : number;
  fecha : string;
}

@Injectable ( {
  providedIn : 'root'
} )
export class MeditacionService {

  // * Injección de dependencias y variables de entorno
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  // * Método que manda una petición al backend para obtener el registro de
  // * meditaciones del usuario
  getMeditaciones ( user : string | null ) : Observable < Meditacion[] > {
    const url = `${ this.base_url }/api/meditacion/meditacion?userId=${ user }`;

    return this.http.get < MeditacionResponse[] > ( url )
      .pipe (
        map ( meditaciones => meditaciones.map ( meditacion => ( {
          tiempo: meditacion.tiempo_meditacion,
          fecha: meditacion.fecha_sesion.toString()
        } ) ) ),
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

  // * Método que manda una petición al backend para guardar un registro de
  // * meditación del usuario
  guardarMeditacion ( userId : string | null, duracion : number ) : Observable < GuardarMeditacionResponse > {
    const url = `${ this.base_url }/api/meditacion/meditacion`;
    const body = { userId, duracion };

    return this.http.post < GuardarMeditacionResponse > ( url, body )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }
}
