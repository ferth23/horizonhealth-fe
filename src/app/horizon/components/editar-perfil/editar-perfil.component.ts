/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : editar-perfil.component.ts
 * Autor         : María Fernanda Torres Herrera
 * Fecha         : 21/10/2024
 * Descripción   : Lógica del componente Editar Perfil
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 24/10/2024    María Torres Herrera      Se declaró el formulario para editar el
 *                                         perfil y se añadieron validaciones para
 *                                         el nombre y el correo
 *
 *
 * 24/10/2024    María Torres Herrera      Se añadió el método 'confirmChanges()'
 * ---------------------------------------------------------------------------- */

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../auth/validators/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  private fb = inject ( FormBuilder );

  // * Definición del formulario de editar perfil
  public myForm: FormGroup = this.fb.group ( {
    fullName: [ '', [ Validators.required, Validators.pattern ( customValidators.firstNameAndLastNamePattern ) ]] ,
    email: [ '', [ Validators.required, Validators.pattern ( customValidators.emailPattern ) ] ],
  } );

  // * Método para validar los cambios al perfil, sin terminar
  confirmChanges () {
    const { fullName, email } = this.myForm.value;
    Swal.fire ( {
      icon: 'success',
      text: "¡Los cambios han sido realizados!"
    } );
  }
}
