/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : ensenanza.service.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 05/11/2024
 * Descripción   : Servicio para manejar el controlador de frases del backend
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 06/11/2024    Humberto Medina Santos    Implementación de los métodos
 *                                         getFrase() y getFrasePremium()
 * ---------------------------------------------------------------------------- */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { FraseResponse } from '../interfaces/frase-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class EnsenanzaService {

  // * Injección de dependencias y variables de entorno
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  // * Método que manda una petición al backend para obtener una frase aleatoria
  // * para los usuarios no premium
  getFrase ( emotion : number ) : Observable < FraseResponse > {
    const url = `${ this.base_url }/api/frases/frases-del-dia?puntaje=${ emotion }`;

    return this.http.get < FraseResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  // * Método que manda una petición al backend para obtener una frase aleatoria
  // * para los usuarios premium
  getFrasePremium ( user : string, emotion : number ) : Observable < FraseResponse > {
    const url = `${ this.base_url }/api/frases/frases/premium?userId=${ user }&puntaje=${ emotion }`;

    return this.http.get < FraseResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }
}
