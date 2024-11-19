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

import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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

  // * Injección de dependencias, servicios y declaración de variables
  private fb = inject ( FormBuilder );
  private user_service = inject ( UserService );
  private user_id : string | null = "";
  public profile_pic_src : string | null = null;
  private user !: UserResponse;

  // * Variable que contiene la referencia del elemento fileInput
  @ViewChild ( 'fileInput' ) fileInput!: ElementRef < HTMLInputElement >;
  selectedImage: File | null = null;

  // * Definición del formulario de editar perfil
  public myForm: FormGroup = this.fb.group ( {
    fullName: [ '', [ Validators.required, Validators.pattern ( customValidators.firstNameAndLastNamePattern ) ]] ,
    email: [ '', [ Validators.required, Validators.pattern ( customValidators.emailPattern ) ] ],
  } );

  // * Constructor del componente en donde se obtiene el id del usuario desde el
  // * localStorage y se obtienen los datos del usuario en base a este
  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
    if ( this.user_id ) this.getUserById ();
  }

  // * Método que obtiene todos los datos del usuario con su id
  getUserById () {
    this.user_service.getUserById ( this.user_id ).subscribe ( {
      next: ( user ) => {
        this.user = user[0];
        this.profile_pic_src = this.user.foto_perfil;
        this.myForm.patchValue ( { fullName: this.user.nombre, email: this.user.correo } );
      },
      error: ( message => Swal.fire ( 'Error', message, 'error' ) )
    } );
  }

  // * Método que hace que s ehaga clic en el input invisible para abrir el dialogo
  // * del explorador de archivos y seleccionar una imagen
  getPicture () {
    this.fileInput.nativeElement.click();
  }

  // * Método que obtiene la imagen seleccionada por el usuario y la guarda en una
  // * variable. En caso de ser la misma que ya se tenia se pone null
  onFileSelected ( event : Event ) {
    const input = event.target as HTMLInputElement;

    if ( input.files && input.files.length > 0 ) {
      this.selectedImage = input.files[0];
      const new_image_url = URL.createObjectURL ( this.selectedImage );

      if ( new_image_url !== this.profile_pic_src ) this.profile_pic_src = new_image_url;
      else this.selectedImage = null;
    }
  }

  // * Método para validar los cambios al perfil
  confirmChanges () {
    const { fullName, email } = this.myForm.value;

    this.user_service.cambiarDatos ( this.user_id, fullName, email ).subscribe ( {
      next: () => {
        if ( this.selectedImage && this.user_id ) {
          this.user_service.cambiarFoto ( this.user_id, this.selectedImage! ).subscribe ( {
            next: ( res ) => {
              this.profile_pic_src = res.data.url;

              Swal.fire ( {
                icon: 'success',
                text: "¡Los cambios en los datos y la foto de perfil han sido realizados!"
              } );
            },
            error: ( message => Swal.fire ( 'Error al cambiar la foto de perfil', message, 'error' ) )
          } );
        } else {
          Swal.fire ( {
            icon: 'success',
            text: "¡Los cambios en los datos han sido realizados!"
          } );
        }
      },
      error: ( message => Swal.fire ( 'Error al cambiar datos', message, 'error' ) )
    } );
  }

  getImage () : string {
    return this.profile_pic_src ? this.profile_pic_src : "placeholder-avatar.png"
  }
}
