/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : contact.service.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 17/11/2024
 * Descripción   : Servicio para manejar el controlador de contacto del backend
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 17/11/2024    Humberto Medina Santos    Se implementó el método sendEmail()
 * ---------------------------------------------------------------------------- */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { SendEmailResponse } from '../interfaces/sendEmail-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // * Injección de dependencias y variables de entorno
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  // * Método que envía un correo al email de la compañia con los datos
  // * proporcionados por el usuario
  sendEmail ( nombre : string | null | undefined, apellido : string | null | undefined, correo : string | null | undefined, telefono : string | null | undefined, mensaje : string | null | undefined ) : Observable < SendEmailResponse > {
    const url = `${ this.base_url }/api/contacto/contact`;
    const body = { nombre, apellido, correo, telefono, mensaje };

    return this.http.post < SendEmailResponse > ( url, body )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }
}
