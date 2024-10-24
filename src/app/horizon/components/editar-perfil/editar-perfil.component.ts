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
