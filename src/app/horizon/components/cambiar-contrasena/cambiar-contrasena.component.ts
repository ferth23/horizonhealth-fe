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
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent {

  // * Injección de dependencias, servicios y declaración de variables
  private fb = inject ( FormBuilder );
  private user_service = inject ( UserService );
  private user_id : string | null = "";

  // * Definición del formulario de editar perfil
  public myForm: FormGroup = this.fb.group ( {
    currentPassword: [ '', [ Validators.required ] ] ,
    newPassword: [ '', [ Validators.required, Validators.minLength ( 10 ) ] ],
    confirmNewPassword: [ '', [ Validators.required ] ]
  } );

  // * Constructor del componente en donde se obtiene el id del usuario desde el
  // * localstorage
  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
  }

  // * Método para validar los cambios a la contraseña
  changePassword () {
    const { currentPassword, newPassword, confirmNewPassword } = this.myForm.value;

    if ( newPassword === confirmNewPassword ) {
      this.user_service.cambiarContrasena ( this.user_id, currentPassword, newPassword )
        .subscribe ( {
          next : () => {
            Swal.fire ( {
              icon: 'success',
              text: "¡Los cambios han sido realizados!"
            } );
          },
          error: ( message => Swal.fire ( 'Error al realizar los cambios', message, 'error' ) )
        } );
    } else {
      Swal.fire ( {
        icon: 'warning',
        text: "La confirmación de la contraseña no concuerda"
      } );
    }
  }
}
