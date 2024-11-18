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
 * ---------------------------------------------------------------------------- */

import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  // * Injección de dependencias y servicios
  private formBuilder = inject ( FormBuilder );
  private contact_service = inject ( ContactService );

  // * Se declara el formulario
  contactForm = this.formBuilder.group ( {
    firstName: [''],
    lastName: [''],
    correo: [''],
    celular: [''],
    mensaje: ['']
  } )

  // * Método para enviar el formulario
  onSubmit () {
    const { firstName, lastName, correo, celular, mensaje } = this.contactForm.value;

    this.contact_service.sendEmail ( firstName, lastName, correo, celular, mensaje )
      .subscribe ( {
        next: () => {
          Swal.fire ( {
            icon: 'success',
            text: "¡El correo ha sido enviado correctamente!"
          } );
        },
        error: ( message => Swal.fire ( 'Error al enviar el correo', message, 'error' ) )
      } );
  }
}
