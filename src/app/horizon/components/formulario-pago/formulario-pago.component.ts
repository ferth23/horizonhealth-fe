/* * ---------------------------------------------------------------------------------
 * HorizonHealth
 * 
 * Archivo       : formulario-pago.component.ts
 * Autor         : Layla Vanessa González Martínez
 * Fecha         : 06/11/2024
 * Descripción   : Aquí se controla la lógica del formulario de pago de la 
 *                 suscripción.
 * 
 * Modificaciones:
 * Fecha         Modificado por     Descripción
 * 07/11/2024    Layla González     Se implementó la funcionalidad para esconder el 
 *                                  formulario de pago.
 * 
 * 08/11/2024    Layla González     Se implementó la validación para el número de 
 *                                  tarjeta.
 * -------------------------------------------------------------------------------- */

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'formulario-pago',
  templateUrl: './formulario-pago.component.html',
  styleUrl: './formulario-pago.component.css'
})
export class FormularioPagoComponent {

  @Output() closePopup = new EventEmitter<void>();

  formPago: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formPago = this.fb.group({
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{16}$/)
        ]
      ]
    });
  }

  validateNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
    this.formPago.get('cardNumber')?.setValue(input.value);
  }

  close() {
    this.closePopup.emit();
  }
}