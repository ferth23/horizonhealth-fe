/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : ejercicios.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript del componente Ejercicios
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 07/11/2024    Humberto Medina Santos    Se implementaron los métodos
 *                                         getEjercicio() y getEjercicioPremium()
 * ---------------------------------------------------------------------------- */

import { Component, inject, signal } from '@angular/core';
import { EjerciciosService } from '../../services/ejercicios.service';
import Swal from 'sweetalert2'

@Component ( {
  selector : 'ejercicios',
  templateUrl : './ejercicios.component.html',
  styleUrl : './ejercicios.component.css'
} )
export class EjerciciosComponent {

  // * Constructor del componente donde se obtienen el id del usuario y el estado
  // * de premium del LocalStorage y dependiendo del estado de premium se muestra
  // * un contenido u otro
  constructor () {
    this.user = localStorage.getItem ( 'user' );
    this.premium = localStorage.getItem ( 'premium' );

    if ( this.premium == "0" ) this.getEjercicio();
    else this.getEjercicioPremium ();
  }

  // * Declaración de variables e injección de dependencias
  private ejercicios_service = inject ( EjerciciosService );
  public ejercicio = signal < string > ( "" );
  public duracion = signal < number > ( 0 );
  private user : string | null = null;
  private premium : string | null = null;

  // * Método que mediante el servicio de ejercicios obtiene la informacion
  // * de cada apartado del ejercicio y lo asigna a su variable respectiva
  getEjercicio () {
    this.ejercicios_service.getEjercicio ()
      .subscribe ( {
        next: ( { rutina, tiempo } ) => {
          this.ejercicio.set ( rutina );
          this.duracion.set ( tiempo );
        },
        error: ( message => Swal.fire ( 'Error al cargar el ejercicio', message, 'error' ) )
      } )
  }

  // * Método idéntico al método getEjercicio() pero para usuarios premium
  getEjercicioPremium () {
    this.ejercicios_service.getEjercicioPremium ( this.user! )
      .subscribe ( {
        next: ( { rutina, tiempo } ) => {
          this.ejercicio.set ( rutina );
          this.duracion.set ( tiempo );
        },
        error: ( message => Swal.fire ( 'Error al cargar el ejercicio premium', message, 'error' ) )
      } )
  }
}
