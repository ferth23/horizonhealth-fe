/* -------------------------------------------------------------------------------
 * HorizonHealth
 * 
 * Archivo       : contacto.component.ts
 * Autor         : Layla Vanessa González Martínez
 * Fecha         : 30/09/2024
 * Descripción   : Aquí se controla la lógica del formulario de contacto. 
 *                 Define los campos que el usuario debe completar y gestiona
 *                 el envío de la información.
 * 
 * Modificaciones:
 * Fecha         Modificado por     Descripción
 * 30/09/2024    Layla González     Creación del formulario y el método para
 *                                  enviarlo (únicamente la declaración).
 * 
 * 20/11/2024    Layla González     Se implementaron expresiones regulares para
 *                                  validar los campos del formulario.
 * ---------------------------------------------------------------------------- */

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  @Output() closePopup = new EventEmitter<void>();

  formContacto: FormGroup;

  // * Expresiones regulares para validar la información ingresada en los campos del formulario
  constructor ( private fb: FormBuilder ) {
    this.formContacto = this.fb.group ( {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        ]
      ], 
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        ]
      ],
      mail: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]
      ],
      message: [
        '',
        [
          Validators.required
        ]
      ]
    } )
  }

  // * Método para validar nombre(s) y apellido(s)
  validateName(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

    value = value.replace(/\s{2,}/g, ' ');

    this.formContacto.get(input.name)?.setValue(value, { emitEvent: false });
  }
  
  // * Método para validar el celular y su formato 123 456 7890
  validatePhone ( event: Event ) {
    const input = event.target as HTMLInputElement;

    const rawValue = input.value.replace(/\D/g, ''); 
    
    const limitedRawValue = rawValue.slice( 0, 10 );

    const formattedValue = limitedRawValue.replace(/(\d{3})(\d{1,3})?(\d{0,4})?$/, (match, g1, g2, g3) => 
                                                    [g1, g2, g3].filter(Boolean).join(' ')
                                                  );

    this.formContacto.get( 'phone' )?.setValue( limitedRawValue, { emitEvent: false } );
  
    input.value = formattedValue;
  }
  
  // * Método para enviar el formulario 
  onSubmit() {
    if ( this.formContacto.valid ) {
      Swal.fire ( {
        title: '¡Mensaje enviado!',
        text: 'Gracias por tus comentarios, los leeremos y nos comunicaremos contigo',
        icon: 'success',
        confirmButtonText: 'Aceptar',

        willOpen: () => {
          const swalElement = document.querySelector('.swal2-container') as HTMLElement;
          
          if ( swalElement ) {
            swalElement.style.zIndex = '1000000';
          }
        }

      } )
      this.closePopup.emit();

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
}