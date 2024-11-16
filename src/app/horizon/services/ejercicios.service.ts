/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : ejercicios.service.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 05/11/2024
 * Descripción   : Servicio para manejar el controlador de ejercicios del backend
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 06/11/2024    Humberto Medina Santos    Implementación de los métodos
 *                                         getEjercicio() y getEjercicioPremium()
 * ---------------------------------------------------------------------------- */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { EjerciciosResponse } from '../interfaces/ejercicios-response.interface';
import { EjerciciosPreResponse } from '../interfaces/ejerciciosPre-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class EjerciciosService {

  // * Injección de dependencias y variables de entorno
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  // * Método que manda una petición al backend para obtener un ejercicio aleatorio
  // * para los usuarios no premium
  getEjercicio () : Observable < EjerciciosResponse > {
    const url = `${ this.base_url }/api/ejercicios/ejercicios`;

    return this.http.get < EjerciciosResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  // * Método que manda una petición al backend para obtener un ejercicio aleatorio
  // * para los usuarios premium
  getEjercicioPremium ( user : string | null ) : Observable < EjerciciosPreResponse > {
    const url = `${ this.base_url }/api/ejercicios/ejercicios/premium?userId=${ user }`;

    return this.http.get < EjerciciosPreResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }
}
