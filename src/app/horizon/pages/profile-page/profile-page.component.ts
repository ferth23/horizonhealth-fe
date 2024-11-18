/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : profile-page.component.ts
 * Autor         : María Fernanda Torres Herrera
 * Fecha         : 16/10/2024
 * Descripción   : Lógica de la página de perfil de usuario de Horizon Health
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 22/10/2024    María Torres Herrera      Se añadió el método 'selectedOption()'
 *
 * 24/10/2024    Humberto Medina Santos    Se añadió la funcionalidad de ocultar
 *                                         o hacer que aparezca el menú de opciones
 *                                         de configuración mediante el método
 *                                         'toggleSettings()'
 *
 * 25/10/2014    María Torres Herrera      Se añadió el método 'deleteAccount()'
 * ---------------------------------------------------------------------------- */

import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { UserResponse } from '../../../auth/interfaces/user-response.interface';
import { UserService } from 'src/app/auth/services/user.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector : 'profile-page',
  templateUrl : './profile-page.component.html',
  styleUrl : './profile-page.component.css'
})
export class ProfilePageComponent {

  // * Declaración de variables e injección de dependencias
  selectedOption : string = 'edit-profile';
  hidden : boolean = true;
  private current_width : number;
  private previous_width : number;
  private user_service = inject ( UserService );
  private router = inject ( Router );
  private user_id : string | null = "";
  private user !: UserResponse;
  private user_pass : string = "";

  @ViewChild ( 'overlay' ) overlay !: ElementRef<HTMLDivElement>;

  // * Constructor del componente donde se inicializa el ancho de la pantalla y se
  // * manda a llamar al método 'toggleSettings()'
  constructor () {
    this.current_width = window.innerWidth;
    this.previous_width = window.innerWidth;
    this.toggleSettings ();
    this.user_id = localStorage.getItem ( 'user' );
    this.getUserById ();
  }

  // * Método que envía al usuario al Home Page
  goToHomePage () {
    this.router.navigateByUrl ( 'horizon-health' );
  }

  // * Método que obtiene todos los datos de un usuario mediante su id
  getUserById () {
    this.user_service.getUserById ( this.user_id ).subscribe ( {
      next: ( res ) => {
        this.user = res[0];
        this.user_pass = res[0]? res[0].contrasena : "";
      },
      error: ( message => Swal.fire ( 'Error', message, 'error' ) )
    } );
  }

  // * Evento que detecta cuando el ancho de la pantalla cambia y dependiendo del
  // * nuevo valor manda a llamar al método 'toggleSettings()'
  @HostListener ( 'window:resize', [ '$event' ] )
  onResize ( event : any ) {
    this.previous_width = this.current_width;
    this.current_width = event.target.innerWidth;
    if ( this.current_width !== this.previous_width ) this.toggleSettings();
  }

  // * Método que hace la funcionalidad de cambiar entre tabs
  selectOption ( option: string ) {
    this.selectedOption = option;
    this.toggleSettings();
  }

  // * Método que, dependiendo del ancho de la pantalla, cambia el valor de la variable
  // * booleana 'hidden' cuyo valor esta ligado a la aparición o desaparición de ciertos
  // * elementos del html y aparece o desaparece un overlay
  toggleSettings () {
    if ( ( window.innerWidth >= 460 || this.hidden ) && this.overlay ) {
      this.hidden = false;
      this.overlay.nativeElement.style.display = "block";
    } else if ( ( window.innerWidth <= 460 || !this.hidden ) && this.overlay ) {
      this.hidden = true;
      this.overlay.nativeElement.style.display = "none";
    }
  }

  // * Método para eliminar la cuenta del usuario
  async deleteAccount () {
    const result = await Swal.fire ( {
      title: "¿Deseas eliminar tu cuenta?",
      text: "Esta acción no se puede deshacer y perderás todo tu progreso y datos guardados",
      inputPlaceholder: "Ingresa tu contraseña",
      input: "password",
      icon: "warning",
      iconColor: "#EA0C5F",
      showCancelButton: true,
      cancelButtonColor: "#808080",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#EA0C5F",
      confirmButtonText: "Eliminar cuenta"
    } );

    const isPasswordValid = await bcrypt.compare ( result.value, this.user_pass );

    if ( ( isPasswordValid ) && ( result.isConfirmed ) ) {
      this.user_service.eliminarCuenta ( this.user_id ).subscribe ( {
        next: () => {
          Swal.fire ( {
            title: "¡Tu cuenta ha sido eliminada!",
            icon: "success",
            iconColor: "#52EA0C",
            confirmButtonColor: "#52EA0C",
            confirmButtonText: "OK"
          } );
          this.router.navigateByUrl ( 'horizon-health/auth/log-in' );
        },
        error: ( message => Swal.fire ( 'Error', message, 'error' ) )
      } );
    } else if ( ( !isPasswordValid ) && ( result.isConfirmed ) ) {
      Swal.fire ( {
        title: "Contraseña incorrecta",
        icon: "error",
        iconColor: "#EA0C5F",
        confirmButtonColor: "#EA0C5F",
        confirmButtonText: "OK"
      } );
    }
  }
}
