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

import { Location } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'formulario-pago',
  templateUrl: './formulario-pago.component.html',
  styleUrl: './formulario-pago.component.css'
})
export class FormularioPagoComponent {

  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
    this.applyRegex();
  }

  @Output() closePopup = new EventEmitter<void>();
  private user_service = inject ( UserService );
  private fb = inject ( FormBuilder );
  private router = inject ( Router );
  private location = inject ( Location );
  private user_id : string | null = "";
  formPago!: FormGroup;


  // * Regex para validaciones
  applyRegex () {
    this.formPago = this.fb.group( {
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{16}$/) // * 0000 0000 0000 0000
        ]
      ],
      expiryDate: [
        '',
        [
          Validators.required,
          this.validateExpiryDate
        ]
      ],
      cvv: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}$/) // * 123
        ]
      ]
    } );
  }

  // * Método para validar que sean puros números, se separen en grupos de 4 dígitos y no se tomen en cuenta los espacios
  validateNumber ( event: Event ) {
    const input = event.target as HTMLInputElement;

    const rawValue = input.value.replace(/\D/g, '');
    const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ');

    this.formPago.get('cardNumber')?.setValue(rawValue, { emitEvent: false });

    input.value = formattedValue;
  }

  // * Método para validar que sean puros números y no haya espacios
  validateCVV ( event: Event ) {
    const input = event.target as HTMLInputElement;

    input.value = input.value
      .replace(/\D/g, '')
      .slice( 0, 3 );

    this.formPago.get( 'cvv' )?.setValue( input.value );
  }

  // * Métodos para validar la fecha de expiración y su formato MM/YY
  validateDate ( event: Event ) {
    const input = event.target as HTMLInputElement;

    input.value = input.value
      .replace (/[^0-9/]/g, '')
      .slice ( 0, 5 );

    this.formPago.get( 'expiryDate' )?.setValue( input.value );
  }

  validateExpiryDate(control: any) {
    let value = control.value;

    if ( ! value )
      return null;

    value = value.replace(/[^0-9/]/g, '');

    if ( value.length !== 5 || !/^\d{2}\/\d{2}$/.test( value ) ) {
      return {
        invalidFormat: true
      };
    }

    return null;
  }

  // * Método para enviar el formulario
  onSubmit() {
    if ( this.formPago.valid ) {
      this.user_service.updateUserToPremium ( this.user_id ).subscribe ( {
        next: () => {
          Swal.fire({
            title: '¡Pago exitoso!',
            text: 'Ahora eres usuario premium',
            icon: 'success',
            timer: 3000,
            showCancelButton: false,
            showConfirmButton: false,

            willOpen: () => {
              const swalElement = document.querySelector('.swal2-container') as HTMLElement;

              if ( swalElement ) {
                swalElement.style.zIndex = '1000000';
              }
            }
          } );

          localStorage.removeItem ( 'premium' );
          localStorage.setItem ( 'premium', "1" );
          this.router.navigateByUrl ( 'horizon-health' );

          setTimeout ( () => {
            this.location.go ( this.location.path() );
            window.location.reload();
          }, 3000 );
        },
        error: ( message => Swal.fire ( 'Error al suscribirse', message, 'error' ) )
      } );
    } else {
      Swal.fire ( {
        title: 'Error',
        text: 'Por favor, llena correctamente todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar',

        willOpen: () => {
          const swalElement = document.querySelector('.swal2-container') as HTMLElement;

          if ( swalElement ) {
            swalElement.style.zIndex = '1000000';
          }
        }
      } );
    }
  }

  // * Método para cerrar el formulario
  close() {
    this.closePopup.emit();
  }
}
