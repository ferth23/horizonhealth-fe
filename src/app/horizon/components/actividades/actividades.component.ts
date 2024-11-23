/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : actividades.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript del componente Actividades
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 07/11/2024    Humberto Medina Santos    Se implementaron los métodos
 *                                         getActividad() y getActividadPremium()
 * ---------------------------------------------------------------------------- */

import { Component, inject, signal } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import Swal from 'sweetalert2';

@Component ( {
  selector : 'actividades',
  templateUrl : './actividades.component.html',
  styleUrl : './actividades.component.css'
} )
export class ActividadesComponent {

  // * Constructor del componente donde se obtienen el id del usuario y el estado
  // * de premium del LocalStorage y dependiendo del estado de premium se muestra
  // * un contenido u otro
  constructor () {
    this.user = localStorage.getItem ( 'user' );
    this.premium = localStorage.getItem ( 'premium' );

    if ( this.premium == "0" ) this.getActividad();
    else this.getActividadPremium ();
  }

  // * Declaración de variables e injección de dependencias
  private actividades_service = inject ( ActividadesService );
  public actividad = signal < string > ( "" );
  public titulo = signal < string > ( "" );
  public duracion = signal < number > ( 0 );
  private user : string | null = null;
  private premium : string | null = null;

  // * Método que mediante el servicio de actividades obtiene la informacion
  // * de cada apartado de la actividad y lo asigna a su variable respectiva
  getActividad () {
    this.actividades_service.getActividad ()
      .subscribe ( {
        next: ( { descripcion, nombre_actividad, tiempo_actividad } ) => {
          this.actividad.set ( descripcion );
          this.titulo.set ( nombre_actividad );
          this.duracion.set ( tiempo_actividad );
        },
        error: ( message => Swal.fire ( 'Error al cargar la actividad', message, 'error' ) )
      } )
  }

  // * Método idéntico al método getActividad() pero para usuarios premium
  getActividadPremium () {
    this.actividades_service.getActividadPremium ( this.user! )
      .subscribe ( {
        next: ( { descripcionPre, nombre_actividadPre, tiempo_actividadPre } ) => {
          this.actividad.set ( descripcionPre );
          this.titulo.set ( nombre_actividadPre );
          this.duracion.set ( tiempo_actividadPre );
        },
        error: ( message => Swal.fire ( 'Error al cargar la actividad premium', message, 'error' ) )
      } )
  }
}