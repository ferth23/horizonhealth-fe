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
 * ---------------------------------------------------------------------------- */

import { Component, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarItem } from 'src/app/sunset/interfaces/NavBarItem';

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
    this.toggleNavLogIn ();
    this.toggleLogIn ();
  }

  // * Evento que detecta cuando el ancho de la pantalla cambia y dependiendo del
  // * nuevo valor manda a llamar a los métodos toggleNavBar y toggleNavLogIn o toggleLogIn
  @HostListener ( 'window:resize', [ '$event' ] )
  onResize ( event : any ) {
    this.previous_width = this.current_width;
    this.current_width = event.target.innerWidth;

    if ( this.current_width !== this.previous_width ) {
      this.toggleNavBar ();
      this.toggleNavLogIn ();
    }

    this.toggleLogIn ();
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
  private current_width : number;
  private previous_width : number;
  private router = inject ( Router );

  // * Método que, dependiendo del ancho de la pantalla, cambia el valor de la variable
  // * boleana 'hidden' cuyo valor esta ligado a la aparición o desaparición de ciertos
  // * elementos del html
  public toggleNavBar () : void {
    if ( window.innerWidth >= 768 || this.hidden ) this.hidden = false;
    else if ( window.innerWidth <= 768 || !this.hidden ) this.hidden = true;
  }

  // * Método que, dependiendo del ancho de la pantalla, cambia el valor de la variable
  // * boleana 'login_hidden' cuyo valor esta ligado a la aparición o desaparición del
  // * botón de Log In que NO esta dentro de los links
  public toggleLogIn () : void {
    if ( window.innerWidth >= 768 ) this.login_hidden = false;
    else if ( window.innerWidth <= 768 ) this.login_hidden = true;
  }

  // * Método que, dependiendo del ancho de la pantalla, cambia el valor de la variable
  // * boleana 'nav_login_hidden' cuyo valor esta ligado a la aparición o desaparición del
  // * botón de Log In que esta dentro de los links
  public toggleNavLogIn () : void {
    if ( window.innerWidth >= 768 && !this.nav_login_hidden ) this.nav_login_hidden = true;
    else if ( window.innerWidth <= 768 && this.nav_login_hidden ) this.nav_login_hidden = false;
  }

  // * Método que, mediante el módulo de rutas, navega hacia la página de Log In
  public goToLogIn () : void {
    this.router.navigateByUrl ( 'horizon-health/auth/log-in' );
  }
}
