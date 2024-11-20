import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DailyTestService {

  // // * Injección de dependencias y variables de entorno
  // private readonly base_url = environment.baseUrl;
  // private http = inject ( HttpClient );

  // // * Método que realiza una petición POST al backend para guardar la fecha en la que se hizo el test diario
  // guardarFecha ( userId: string | null ) : Observable < DailyTestResponse > {
  //   const url = `${ this.base_url }/api/test/guardar-puntaje`;
  //   const body = { userId };

  //   return this.http.post < DailyTestResponse > ( url, body )
  //     .pipe (
  //       catchError ( err => throwError ( () => err.error.message ) )
  //     );
  // }

  // // * Método que realiza una petición GET al backend para obtener la fecha en la que se hizo el último test diario
  // obtenerFechaTest ( userId: string | null ) : Observable < DailyTestDateResponse > {
  //   const url = `${ this.base_url }/api/test/resultados-test/${ userId }`;

  //   return this.http.get < DailyTestDateResponse[] > ( url )
  //     .pipe (
  //       catchError ( err => throwError ( () => err.error.message ) )
  //     );
  // }
}
