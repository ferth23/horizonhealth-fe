/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : nav-bar.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 07/10/2024
 * Descripción   : Archivo de typescript del componente NavBar
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 08/10/2024    Humberto Medina Santos    Se añadió la funcionalidad de esconder o
 *                                         aparecer los links de la navegación asi
 *                                         como el botón de Log In
 *
 * 09/10/2024    Humberto Medina Santos    Se añadió el método para navegar hacia
 *                                         la página de Log In
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 *
 * 22/11/2024    Humberto Medina Santos    Se eliminaron métodos que ya no eran
 *                                         necesarios y se modificó el método
 *                                         toggleNavBar()
 * ---------------------------------------------------------------------------- */

import { Component, HostListener, inject, signal } from '@angular/core';
import { UserResponse } from 'src/app/auth/interfaces/user-response.interface';
import { UserService } from 'src/app/auth/services/user.service';
import { NavBarItem } from 'src/app/sunset/interfaces/NavBarItem';
import Swal from 'sweetalert2';

@Component ( {
  selector : 'nav-bar',
  templateUrl : './nav-bar.component.html',
  styleUrl : './nav-bar.component.css'
} )
export class NavBarComponent {

  // * Constructor del componente donde se inicializa el ancho de la pantalla y se
  // * manda a llamar a los métodos toggleNavBar, toggleNavLogIn y toggleLogIn
  constructor () {
    this.current_width = window.innerWidth;
    this.previous_width = window.innerWidth;
    this.toggleNavBar ();
    this.user_id = localStorage.getItem ( 'user' );
    this.getUserById ();
  }

  // * Evento que detecta cuando el ancho de la pantalla cambia y dependiendo del
  // * nuevo valor manda a llamar a los métodos toggleNavBar y toggleNavLogIn o toggleLogIn
  @HostListener ( 'window:resize', [ '$event' ] )
  onResize ( event : any ) {
    this.previous_width = this.current_width;
    this.current_width = event.target.innerWidth;
    if ( this.current_width !== this.previous_width ) this.toggleNavBar ();
  }

  // * Arreglo que guarda las propiedades de cada sección para iterarlas en el html
  public NavBarItems = signal < NavBarItem [] > ( [
    { name : 'Inicio',          route : 'horizon-health'                 },
    { name : 'Meditación',      route : 'horizon-health/meditacion'      },
    { name : 'Recomendaciones', route : 'horizon-health/recomendaciones' },
    { name : 'Enseñanza',       route : 'horizon-health/enseñanza'       }
  ] );

  // * Declaración de variables y dependencias
  public hidden : boolean = false;
  public login_hidden : boolean = false;
  public nav_login_hidden : boolean = true;
  public session_text : string = "Iniciar Sesión";
  private current_width : number;
  private previous_width : number;
  private user_service = inject ( UserService );
  private user_id : string | null = "";
  public options_hidden : boolean = true;

  public user : UserResponse = {
    id_usuario: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    fecha_de_creacion: new Date(),
    fecha_de_ultimo_ingreso: new Date(),
    premium: 0,
    foto_perfil: ''
  };

  // * Método que obtiene todos los datos del usuario con su id
  getUserById () {
    this.user_service.getUserById ( this.user_id ).subscribe ( {
      next: ( res ) => this.user = res[0],
      error: ( message => Swal.fire ( 'Error', message, 'error' ) )
    } );
  }

  // * Método que, dependiendo del ancho de la pantalla, cambia el valor de la variable
  // * boleana 'hidden' cuyo valor esta ligado a la aparición o desaparición de ciertos
  // * elementos del html
  public toggleNavBar () : void {
    if ( window.innerWidth >= 1110 || this.hidden ) this.hidden = false;
    else if ( window.innerWidth <= 1110 || !this.hidden ) this.hidden = true;
  }

  // * Método que asigna la imagen que se mostrará como foto de perfil del usuario
  getImage () : string {
    return this.user.foto_perfil ? this.user.foto_perfil : "placeholder-avatar.png"
  }
}
