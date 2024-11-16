/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : lectura.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript del componente Lectura
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 22/10/2024    Humberto Medina Santos    Se crearon las variables con las que se
 *                                         va a mostrar todo lo referente a la lectura
 *
 * 07/11/2024    Humberto Medina Santos    Se implementaron los métodos
 *                                         getLectura() y getLecturaPremium()
 * ---------------------------------------------------------------------------- */

import { Component, inject, signal } from '@angular/core';
import { LecturaService } from '../../services/lectura.service';
import Swal from 'sweetalert2'

@Component ( {
  selector : 'lectura',
  templateUrl : './lectura.component.html',
  styleUrl : './lectura.component.css'
} )
export class LecturaComponent {

  // * Constructor del componente donde se obtienen el id del usuario y el estado
  // * de premium del LocalStorage y dependiendo del estado de premium se muestra
  // * un contenido u otro
  constructor () {
    this.user = localStorage.getItem ( 'user' );
    this.premium = localStorage.getItem ( 'premium' );

    if ( this.premium == "0" ) this.getLectura();
    else this.getLecturaPremium ();
  }

  // * Declaración de variables e injección de dependencias
  public reading_text = signal < string > ( "" );
  public reading_title = signal < string > ( "" );
  public reading_author = signal < string > ( "" );
  public reading_year = signal < number > ( 0 );
  public genre_1 = signal < string > ( "" );
  public genre_2 = signal < string > ( "" );
  public genre_3 = signal < string > ( "" );
  private user : string | null = null;
  private premium : string | null = null;
  private lectura_service = inject ( LecturaService );

  // * Método que mediante el servicio de lectura obtiene la informacion
  // * de cada apartado de la lectura y lo asigna a su variable respectiva
  getLectura () {
    this.lectura_service.getLectura ()
      .subscribe ( {
        next: ( res ) => {
          this.reading_text.set ( res.lectura );
          this.reading_title.set ( res.titulo );
          this.reading_author.set ( res.autor );
          this.reading_year.set ( res.año );
          this.genre_1.set ( res.genero );
          this.genre_2.set ( res.genero_secundario_1 );
          this.genre_3.set ( res.genero_secundario_2 );
        },
        error: ( message => Swal.fire ( 'Error al cargar la lectura', message, 'error' ) )
      } )
  }

  // * Método idéntico al método getLectura() pero para usuarios premium
  getLecturaPremium () {
    this.lectura_service.getLecturaPremium ( this.user! )
      .subscribe ( {
        next: ( res ) => {
          this.reading_text.set ( res.lecturaPre );
          this.reading_title.set ( res.tituloPre );
          this.reading_author.set ( res.autorPre );
          this.reading_year.set ( res.añoPre );
          this.genre_1.set ( res.generoPre );
          this.genre_2.set ( res.genero_secundario_1Pre );
          this.genre_3.set ( res.genero_secundario_2Pre );
        },
        error: ( message => Swal.fire ( 'Error al cargar la lectura premium', message, 'error' ) )
      } )
  }
}
