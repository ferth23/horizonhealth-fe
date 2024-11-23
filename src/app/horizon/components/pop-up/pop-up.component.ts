/* -------------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : pop-up.component.ts
 * Autor         : Layla Vanessa González Martínez
 * Fecha         : 07/10/2024
 * Descripción   : Implementa la lógica del componente del pop-up para que se
 *                 guarde la emoción seleccionada y desaparezca el Pop Up.
 *
 * Modificaciones:
 * Fecha         Modificado por     Descripción
 * 07/10/2024    Layla González     Creación del método para guardar la emoción
 *                                  seleccionada.
 *
 * 10/10/2024    Humberto Medina    Implementación de la variable para
 *                                  desaparecer el Pop Up.
 * ---------------------------------------------------------------------------- */

import { Component, inject, output } from '@angular/core';
import { DailyTestService } from '../../services/daily-test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {

  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
  }

  private daily_test_service = inject ( DailyTestService );
  private user_id : string | null = "";

  // * Variable para controlar cuando desaparece el Pop Up
  public onHide = output <boolean> ();

  // * Método que guarda la emoción seleccionada
  emotionSelected ( emotion_selected: string ) {
    localStorage.setItem ( 'emotion', emotion_selected );

    this.daily_test_service.guardarFecha ( this.user_id ).subscribe ( {
      error: ( message => Swal.fire (
        'Error al guardar la fecha del test',
        message,
        'error'
      ) )
    } );

    // * Desaparezca el Pop Up
    this.onHide.emit(true);
  }
}
