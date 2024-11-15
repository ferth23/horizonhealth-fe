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

import { Component, output } from '@angular/core';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {

  // * Variable para controlar cuando desaparece el Pop Up
  public onHide = output <boolean> ();
  private emotion : string = "";

  // * Método que guarda la emoción seleccionada
  emotionSelected ( emotion_selected: string ) {
    this.emotion = emotion_selected;

    // * Desaparezca el Pop Up
    this.onHide.emit(true);
  }
}
