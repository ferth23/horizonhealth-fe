/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : register-page.component.ts
 * Autor         : María Fernanda Torres Herrera
 * Fecha         : 07/10/2024
 * Descripción   : Lógica de la página de registro de Horizon Health
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 08/10/2024    María Torres Herrera      Se declaró el formulario de registro y
 *                                         se añadieron validaciones para el nombre
 *                                         y la contraseña
 *
 * 11/10/2024    Humberto Medina Santos    Se añadió el método 'register()'
 * ---------------------------------------------------------------------------- */

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../validators/validators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component( {
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
} )
export class RegisterPageComponent {
  private fb = inject ( FormBuilder );
  private router = inject ( Router );

  // * Definición del formulario de registro
  public myForm: FormGroup = this.fb.group ( {
    fullName: [ '', [ Validators.required, Validators.pattern ( customValidators.firstNameAndLastNamePattern ) ] ] ,
    email: [ '', [ Validators.required, Validators.pattern ( customValidators.emailPattern ) ] ],
    password: [ '', [ Validators.required, Validators.minLength ( 10 ) ] ],
    confirmPassword: [ '', [ Validators.required ] ]
  } );

  // * Método para validar el registro, sin terminar
  register () {
    const { fullName, email, password } = this.myForm.value;

    // this.authService.register ( name, email, password )
    //   .subscribe ( {
    //     next: () => this.router.navigateByUrl ( 'horizon-health' ),
    //     error: ( message => Swal.fire ( 'Error', message, 'error' ) )
    //   } );
  }
}
