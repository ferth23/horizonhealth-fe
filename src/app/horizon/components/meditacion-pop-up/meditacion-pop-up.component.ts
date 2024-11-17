/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : meditacion-pop-up.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript del componente MeditacionPopUp
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 16/10/2024    Humberto Medina Santos    Se añadió el evento onStart con su
 *                                         respectivo método start() para poder
 *                                         emitir dicho evento al hacer clic en
 *                                         el botón iniciar
 *                                         Se agregó también el método
 *                                         changeSpinnerValue() para controlar el
 *                                         que se tiene del spinner
 *
 * 17/10/2024    Humberto Medina Santos    Se añadió el evento onCancel con su
 *                                         respectivo método cancel() para poder
 *                                         emitir dicho evento al hacer clic en
 *                                         el botón cancelar
 * ---------------------------------------------------------------------------- */

import { AfterViewInit, Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { MeditacionService } from '../../services/meditacion.service';
import Swal from 'sweetalert2';

@Component({
  selector : 'meditacion-pop-up',
  templateUrl : './meditacion-pop-up.component.html',
  styleUrl : './meditacion-pop-up.component.css'
})
export class MeditacionPopUpComponent {

  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
    this.premium = localStorage.getItem ( 'premium' );
    this.no_premium = this.premium === "0" ? true : false;
  }

  // * Declaración de eventos y variables
  private meditacion_service = inject ( MeditacionService );
  public onStart = output <number> ();
  public onCancel = output <boolean> ();
  public value_spinner : number = 1;
  private premium : string | null = "";
  private user_id : string | null = "";
  public no_premium : boolean = true;

  // * Método que emite el evento onStart con un valor dado
  public start () : void {
    this.onStart.emit ( this.value_spinner );

    this.meditacion_service.guardarMeditacion ( this.user_id, this.value_spinner )
      .subscribe ( {
        error: ( message => Swal.fire (
          'Error al guardar la meditación',
          message,
          'error'
        ) )
      } );
  }

  // * Método que emite el evento onCancel con un valor dado
  public cancel () : void {
    this.onCancel.emit ( true );
  }

  // * Método que controla el valor del spinner numérico para que este no baje
  // * de 1 (que se vaya a números negativos) ni que vaya a más de 10. Además de
  // * aumentar o disminuir su valor dependiendo del botón al que se le haga clic
  public changeSpinnerValue ( flag : string ) {
    if ( ( flag == 'minus' && this.value_spinner == 1 ) || ( flag == 'plus' && this.value_spinner == 10 ) ) return;
    this.value_spinner = flag == 'plus' ? this.value_spinner += 1 : this.value_spinner -= 1;
  }
}
