/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : user.service.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 05/11/2024
 * Descripción   : Servicio para manejar el controlador de usuarios del backend
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 05/11/2024    Humberto Medina Santos    Implementación de los métodos de
 *                                         login() y register()
 *
 * 06/11/2024    Humberto Medina Santos    Implementación de los métodos de
 *                                         checkPremium() y updateUserToPremium()
 *
 * 12/11/2024    Humberto Medina Santos    Se agregaron los siguientes métodos:
 *                                            - getUserById()
 *                                            - cambiarFoto()
 *                                            - cambiarDatos()
 *                                            - cambiarContrasena()
 *                                            - eliminarCuenta()
 *                                            - cancelarSuscripcion()
 * ---------------------------------------------------------------------------- */

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap, switchMap } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse } from '../interfaces/login-response.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { PremiumResponse } from '../interfaces/premium-response.interface';
import { UpgradeResponse } from '../interfaces/upgrade-response.interface';
import { UserResponse } from '../interfaces/user-response.interface';
import { PictureResponse } from '../interfaces/picture-response.interface';
import { DataResponse } from '../interfaces/data-response.interface';
import { PasswordResponse } from '../interfaces/password-response.interface';
import { DeleteResponse } from '../interfaces/delete-response.interface';
import { SuscriptionResponse } from '../interfaces/suscription-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class UserService {

  // * Injección de dependencias y variables de entorno
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

  // * Método que manda una petición al backend para hacer el login del usuario
  login ( email : string, password : string ) : Observable < LoginResponse > {
    const url = `${ this.base_url }/api/usuarios/login`;
    const params = new HttpParams()
      .set ( 'correo', email )
      .set ( 'contrasena', password );

    return this.http.post < LoginResponse > ( url, {}, { params } )
      .pipe (
        tap ( ( { userId, premium } ) => {
          localStorage.setItem ( 'user', userId.toString() );
          localStorage.setItem ( 'premium', premium.toString() );
        } ),
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

  // * Método que manda una petición al backend para hacer el registro de un usuario
  register ( name : string, email : string, password : string ) : Observable < RegisterResponse > {
    const url = `${ this.base_url }/api/usuarios/registro`;
    const body = { nombre: name, correo: email, contrasena: password, premium: false };

    return this.http.post < RegisterResponse > ( url, body )
      .pipe (
        switchMap ( () => this.login ( email, password ) ),
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

  // * Método que manda una petición al backend para comprobar si un usuario es premium
  checkPremium ( user : number ) : Observable < PremiumResponse > {
    const url = `${ this.base_url }/api/usuarios/premium-status/${ user }`;

    return this.http.get < PremiumResponse > ( url )
      .pipe (
        tap ( ( { premium } ) => localStorage.setItem ( 'premium', premium.toString() ) ),
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

  // * Método que manda una petición al backend para hacer premium a un usuario
  updateUserToPremium ( user : number ) : Observable < UpgradeResponse > {
    const url = `${ this.base_url }/api/usuarios/upgrade/${ user }`;

    return this.http.put < UpgradeResponse > ( url, {} )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

  // * Método que manda una petición al backend para obtener los datos de un usuario
  getUserById ( user : string | null ) : Observable < UserResponse[] > {
    const url = `${ this.base_url }/api/usuarios/usuarios/${ user }`;

    return this.http.get < UserResponse[] > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

  // * Método que manda una petición al backend para cambiar la foto de perfil del usuario
  cambiarFoto ( user : string | null, file : File ) {
    const url = `${ this.base_url }/api/usuarios/usuarios/${ user }/upload`;
    const form_data = new FormData ();
    form_data.append ( 'image', file )

    return this.http.post < PictureResponse > ( url, form_data )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  // * Método que manda una petición al backend para cambiar el nombre y correo del usuario
  cambiarDatos ( user : string | null, nombre : string, correo : string ) {
    const url = `${ this.base_url }/api/usuarios/cambiar-datos/${ user }`;
    const body = { nombre, correo };

    return this.http.put < DataResponse > ( url, body )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  // * Método que manda una petición al backend para cambiar la contraseña del usuario
  cambiarContrasena ( user : string | null, c_actual : string, c_nueva : string ) {
    const url = `${ this.base_url }/api/usuarios/cambiar-contrasena/${ user }`;
    const body = { contrasenaActual: c_actual, nuevaContrasena: c_nueva };

    return this.http.put < PasswordResponse > ( url, body )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  // * Método que manda una petición al backend para eliminar la cuenta del usuario
  eliminarCuenta ( user : string | null ) {
    const url = `${ this.base_url }/api/usuarios/eliminar-cuenta/${ user }`;

    return this.http.delete < DeleteResponse > ( url )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

  // * Método que manda una petición al backend para cancelar la suscripción del usuario
  cancelarSuscripcion ( user : string | null ) {
    const url = `${ this.base_url }/api/usuarios/cancelar-suscripcion/${ user }`;

    return this.http.put < SuscriptionResponse > ( url, {} )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      )
  }

}
