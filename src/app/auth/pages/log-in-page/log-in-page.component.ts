/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : log-in-page.component.ts
 * Autor         : María Fernanda Torres Herrera
 * Fecha         : 07/10/2024
 * Descripción   : Lógica de la página de inicio de sesión de Horizon Health
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 08/10/2024    María Torres Herrera      Se declaró el formulario de inicio de
 *                                         sesión y se añadió una validación para
 *                                         la contraseña
 *
 * 11/10/2024    Humberto Medina Santos    Se añadió el método 'login()'
 *
 * 16/10/2024    María Torres Herrera      Se añadió el método 'togglePasswordView()'
 *
 * 05/11/2024    Humberto Medina Santos    Implementación final del método login()
 * ---------------------------------------------------------------------------- */

import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../validators/validators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserService } from '../../services/user.service';

@Component ( {
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
} )
export class LogInPageComponent {

  // * Constructor del componente en donde se eliminan del localStorage las
  // * variables user, premium y emotion
  constructor () {
    if ( localStorage.getItem ( 'user' ) ) localStorage.removeItem ( 'user' );
    if ( localStorage.getItem ( 'premium' ) ) localStorage.removeItem ( 'premium' );
  }

  // * Injección de dependencias, servicios y declaración de variables
  private fb = inject ( FormBuilder );
  private router = inject ( Router );
  private user_service = inject ( UserService );

  @ViewChild ( 'eyeopened', { static: true } )
  eye_opened!: ElementRef<SVGElement>;

  @ViewChild ( 'eyeclosed', { static: true } )
  eye_closed!: ElementRef<SVGElement>;

  public type: string = 'password';

  // * Definición del formulario de inicio de sesión
  public myForm: FormGroup = this.fb.group ( {
    email: [ '', [ Validators.required, Validators.pattern ( customValidators.emailPattern ) ] ],
    password: [ '', [ Validators.required, Validators.minLength ( 10 ) ] ],
  } );

  // * Método para validar el inicio de sesión
  login () {
    const { email, password } = this.myForm.value;

    this.user_service.login ( email, password )
      .subscribe ( {
        next: ( { userId } ) => {
          this.user_service.checkPremium ( userId ).subscribe ( {
            next: () => this.router.navigate ( [ 'horizon-health' ], { replaceUrl: true } ),
            error: ( message => Swal.fire ( 'Error al verificar Status de Premium', message, 'error' ) )
          } );
        },
        error: ( message => Swal.fire ( 'Error al iniciar sesión', message, 'error' ) )
      } );
  }

  // * Método que hace que se oculte la contraseña o se vea mientras se escribe
  public togglePasswordView(): void {
    if ( this.eye_opened.nativeElement.classList.contains('invisible') ) {
      this.eye_opened.nativeElement.classList.remove('invisible');
      this.eye_closed.nativeElement.classList.add('invisible');
      this.type = 'text';
    } else {
      this.eye_opened.nativeElement.classList.add('invisible');
      this.eye_closed.nativeElement.classList.remove('invisible');
      this.type = 'password';
    }
  }
}
