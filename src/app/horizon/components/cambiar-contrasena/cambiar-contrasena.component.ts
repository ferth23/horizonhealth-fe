/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : cambiar-contrasena.component.ts
 * Autor         : María Fernanda Torres Herrera
 * Fecha         : 21/10/2024
 * Descripción   : Lógica del componente Cambiar Contraseña
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 24/10/2024    María Torres Herrera      Se declaró el formulario para cambiar la
 *                                         contraseña de la cuenta y se añadieron
 *                                         validaciones para las contraseñas
 *
 *
 * 24/10/2024    María Torres Herrera      Se añadió el método 'changePassword()'
 * ---------------------------------------------------------------------------- */

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../auth/validators/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent {
  private fb = inject ( FormBuilder );

  // * Definición del formulario de editar perfil
  public myForm: FormGroup = this.fb.group ( {
    currentPassword: [ '', [ Validators.required ] ] ,
    newPassword: [ '', [ Validators.required, Validators.minLength ( 10 ) ] ],
    confirmNewPassword: [ '', [ Validators.required ] ]
  } );

  // * Método para validar los cambios a la contraseña, sin terminar
  changePassword () {
    const { currentPassword, newPassword, confirmNewPassword } = this.myForm.value;
    Swal.fire ( {
      icon: 'success',
      text: "¡Los cambios han sido realizados!"
    } );
  }
}
