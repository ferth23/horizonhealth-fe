/* * ---------------------------------------------------------------------------------

 * Modificaciones:
 * Fecha         Modificado por     Descripción
 * 08/11/2024    Layla González     Se implementó la funcionalidad para esconder el 
 *                                  formulario de pago.
 * -------------------------------------------------------------------------------- */

import { Component } from '@angular/core';

@Component({
  selector: 'suscription-page',
  templateUrl: './suscription-page.component.html',
  styleUrl: './suscription-page.component.css'
})
export class SuscriptionPageComponent {
  formPago = false;

  mostrarFormPago() {
    this.formPago = true;
  }
}
