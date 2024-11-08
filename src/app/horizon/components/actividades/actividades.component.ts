import { Component, inject, signal } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import Swal from 'sweetalert2';

@Component ( {
  selector : 'actividades',
  templateUrl : './actividades.component.html',
  styleUrl : './actividades.component.css'
} )
export class ActividadesComponent {
  constructor () {
    this.user = localStorage.getItem ( 'user' );
    this.premium = localStorage.getItem ( 'premium' );

    if ( this.premium == "0" ) this.getActividad();
    else this.getActividadPremium ();
  }

  private actividades_service = inject ( ActividadesService );
  public actividad = signal < string > ( "" );
  public titulo = signal < string > ( "" );
  public duracion = signal < number > ( 0 );
  private user : string | null = null;
  private premium : string | null = null;

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

  getActividadPremium () {
    this.actividades_service.getActividadPremium ( this.user! )
      .subscribe ( {
        next: ( { descripcion, nombre_actividad, tiempo_actividad } ) => {
          this.actividad.set ( descripcion );
          this.titulo.set ( nombre_actividad );
          this.duracion.set ( tiempo_actividad );
        },
        error: ( message => Swal.fire ( 'Error al cargar la actividad premium', message, 'error' ) )
      } )
  }
}
