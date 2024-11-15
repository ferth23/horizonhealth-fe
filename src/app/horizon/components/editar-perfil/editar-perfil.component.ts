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

import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../auth/validators/validators';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/auth/services/user.service';
import { UserResponse } from 'src/app/auth/interfaces/user-response.interface';

@Component({
  selector: 'editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  private fb = inject ( FormBuilder );
  private user_service = inject ( UserService );
  private user_id : string | null = "";
  public profile_pic_src : string | null = null;
  private user !: UserResponse;

  @ViewChild ( 'name', { static: true } ) name_input !: ElementRef < HTMLInputElement >;
  @ViewChild ( 'email', { static: true } ) email_input !: ElementRef < HTMLInputElement >;

  @ViewChild ( 'fileInput' ) fileInput!: ElementRef < HTMLInputElement >;
  selectedImage: File | null = null;

  // * Definición del formulario de editar perfil
  public myForm: FormGroup = this.fb.group ( {
    fullName: [ '', [ Validators.required, Validators.pattern ( customValidators.firstNameAndLastNamePattern ) ]] ,
    email: [ '', [ Validators.required, Validators.pattern ( customValidators.emailPattern ) ] ],
  } );

  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
    if (this.user_id) this.getUserById ();
  }

  getUserById () {
    this.user_service.getUserById ( this.user_id ).subscribe ( {
      next: ( user ) => {
        this.user = user[0];
        this.profile_pic_src = this.user.foto_perfil;
        this.name_input.nativeElement.value = this.user.nombre;
        this.email_input.nativeElement.value = this.user.correo;
      },
      error: ( message => Swal.fire ( 'Error', message, 'error' ) )
    } );
  }

  getPicture () {
    this.fileInput.nativeElement.click();
  }

  onFileSelected ( event : Event ) {
    const input = event.target as HTMLInputElement;
    if ( input.files && input.files.length > 0 ) {
      this.selectedImage = input.files[0];
      this.profile_pic_src = URL.createObjectURL(this.selectedImage);
    }
  }

  // * Método para validar los cambios al perfil
  confirmChanges () {
    const { fullName, email } = this.myForm.value;

    this.user_service.cambiarDatos ( this.user_id, fullName, email ).subscribe ( {
      next: () => {
        this.user_service.cambiarFoto ( this.user_id, this.profile_pic_src ).subscribe ( {
          next: () => {
            Swal.fire ( {
              icon: 'success',
              text: "¡Los cambios han sido realizados!"
            } );
          },
          error: ( message => Swal.fire ( 'Error al cambiar la foto de perfil', message, 'error' ) )
        } );
      },
      error: ( message => Swal.fire ( 'Error al cambiar datos', message, 'error' ) )
    } );
  }

  getImage () : string {
    return this.profile_pic_src ? this.profile_pic_src : "placeholder-avatar.png"
  }
}
