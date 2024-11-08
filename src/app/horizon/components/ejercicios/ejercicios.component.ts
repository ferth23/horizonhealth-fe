import { Component, inject, signal } from '@angular/core';
import { EjerciciosService } from '../../services/ejercicios.service';
import Swal from 'sweetalert2'

@Component ( {
  selector : 'ejercicios',
  templateUrl : './ejercicios.component.html',
  styleUrl : './ejercicios.component.css'
} )
export class EjerciciosComponent {
  constructor () {
    this.user = localStorage.getItem ( 'user' );
    this.premium = localStorage.getItem ( 'premium' );

    if ( this.premium == "0" ) this.getEjercicio();
    else this.getEjercicioPremium ();
  }

  private ejercicios_service = inject ( EjerciciosService );
  public ejercicio = signal < string > ( "" );
  public duracion = signal < number > ( 0 );
  private user : string | null = null;
  private premium : string | null = null;

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
