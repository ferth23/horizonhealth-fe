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
 *
 * 19/11/2024    Layla González     Se implementaron expresiones regulares para
 *                                  validar los campos del formulario y se
 *                                  modificaron métodos.
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
          Validators.pattern(/^(4\d{15}|5[1-5]\d{14}|2(?:2[2-9]\d{2}|[3-6]\d{3}|7[01]\d{2}|720\d{2})\d{12})$/) // * VISA y Mastercard
        ]
      ],
      expiryDate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/), // * MM/YY
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

    this.formPago.get( 'cardNumber' )?.setValue( rawValue, { emitEvent: false } );

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

  // * Método para validar la fecha de expiración
  validateExpiryDate ( control: any ) {
    const value = control.value;

    if ( ! value )
      return null;

    const [month, year] = value.split( '/' ).map( Number );
    if ( ! month || ! year ) {
      return {
        invalidDate: true
      };
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if ( year < currentYear || ( year === currentYear && month < currentMonth ) ) {
      return {
        expired: true
      };
    }

    return null;
  }

  // * Método para validar el formato MM/YY de la fecha de expiración
  validateDate ( event: Event ) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');

    if ( value.length >= 2 ) {
      value = value.slice( 0, 2 ) + '/' + value.slice( 2, 4 );
    }

    value = value.slice(0, 5);

    input.value = value;
    this.formPago.get( 'expiryDate' )?.setValue( value, { emitEvent: false } );
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
