/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : ensenanza.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript del componente Ensenanza
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 07/11/2024    Humberto Medina Santos    Se implementaron los métodos
 *                                         getFrase() y getFrasePremium()
 * ---------------------------------------------------------------------------- */

import { Component, inject, signal } from '@angular/core';
import { EnsenanzaService } from '../../services/ensenanza.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ensenanza-page',
  templateUrl: './ensenanza-page.component.html',
  styleUrls: ['./ensenanza-page.component.css']
})
export class EnsenanzaPageComponent {

  // * Constructor del componente donde se obtienen el id del usuario, la emoción
  // * diaria y el estado de premium del LocalStorage y dependiendo del estado de
  // * premium se muestra un contenido u otro
  constructor () {
    this.user = localStorage.getItem ( 'user' );
    this.premium = localStorage.getItem ( 'premium' );
    this.emotion = localStorage.getItem ( 'emotion' );

    if ( this.premium == "0" ) this.getFrase ();
    else this.getFrasePremium ();
  }

  // * Declaración de variables e injección de dependencias
  private ensenanza_service = inject ( EnsenanzaService );
  private user : string | null = null;
  private premium : string | null = null;
  private emotion : string | null = null;
  public ensenanza = signal < string > ( "" );

  // * Método que mediante el servicio de ensenanza obtiene la frase y la asigna
  // * a una variable para posteriormente mostrarla en el html
  getFrase () {
    this.ensenanza_service.getFrase ( Number ( this.emotion ) )
      .subscribe ( {
        next: ( { frase } ) => this.ensenanza.set ( frase ),
        error: ( message => Swal.fire ( 'Error al cargar la enseñanza', message, 'error' ) )
      } );
  }

  // * Método idéntico al método getFrase() pero para usuarios premium
  getFrasePremium () {
    this.ensenanza_service.getFrasePremium ( this.user!, Number ( this.emotion ) )
      .subscribe ( {
        next: ( { frase } ) => this.ensenanza.set ( frase ),
        error: ( message => Swal.fire ( 'Error al cargar la enseñanza premium', message, 'error' ) )
      } );
  }
}
