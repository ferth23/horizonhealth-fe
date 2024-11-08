import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, throwError, tap, switchMap } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse } from '../interfaces/login-response.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { PremiumResponse } from '../interfaces/premium-response.interface';
import { UpgradeResponse } from '../interfaces/upgrade-response.interface';

@Injectable ( {
  providedIn : 'root'
} )
export class UserService {
  private readonly base_url = environment.baseUrl;
  private http = inject ( HttpClient );

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

  register ( name : string, email : string, password : string ) : Observable < RegisterResponse > {
    const url = `${ this.base_url }/api/usuarios/registro`;
    const body = {
      nombre: name,
      correo: email,
      contrasena: password,
      premium: false
    };

    return this.http.post < RegisterResponse > ( url, body )
      .pipe (
        switchMap ( () => this.login ( email, password ) ),
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

  checkPremium ( user : number ) : Observable < PremiumResponse > {
    const url = `${ this.base_url }/api/usuarios/premium-status/${ user }`;

    return this.http.get < PremiumResponse > ( url )
      .pipe (
        tap ( ( { premium } ) => localStorage.setItem ( 'premium', premium.toString() ) ),
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

  updateUserToPremium ( user : number ) : Observable < UpgradeResponse > {
    const url = `${ this.base_url }/api/usuarios/upgrade/${ user }`;
    const body = { user };

    return this.http.put < UpgradeResponse > ( url, body )
      .pipe (
        catchError ( err => throwError ( () => err.error.message ) )
      );
  }

}
