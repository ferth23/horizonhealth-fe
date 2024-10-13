/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : nav-bar.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript del componente NavBar
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 03/10/2024    Humberto Medina Santos    Se añadió la funcionalidad de esonder o
 *                                         aparecer los links de la navegación y se
 *                                         implementó el evento para hacer scroll
 *                                         automático a una sección
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { Component, HostListener, output, signal } from '@angular/core';
import { NavBarItem } from '../../interfaces/NavBarItem';

@Component ( {
  selector : 'nav-bar',
  templateUrl : './nav-bar.component.html',
  styleUrls : [ './nav-bar.component.css' ]
} )
export class NavBarComponent {

  // * Constructor del componente donde se inicializa el ancho de la pantalla y se
  // * manda a llamar el método toggleNavBar
  constructor () {
    this.current_width = window.innerWidth;
    this.previous_width = window.innerWidth;
    this.toggleNavBar ();
  }

  // * Evento que detecta cuando el ancho de la pantalla cambia y dependiendo del
  // * nuevo valor manda a llamar al método toggleNavBar
  @HostListener ( 'window:resize', [ '$event' ] )
  onResize ( event : any ) {
    this.previous_width = this.current_width;
    this.current_width = event.target.innerWidth;
    if ( this.current_width !== this.previous_width ) this.toggleNavBar ();
  }

  // * Arreglo que guarda las propiedades de cada sección para iterarlas en el html
  public NavBarItems = signal < NavBarItem [] > ( [
    { name : 'Inicio',   section : 'inicio'   },
    { name : 'Acerca',   section : 'acerca'   },
    { name : 'Contacto', section : 'contacto' },
  ] );

  // * Declaración de variables y eventos
  public hidden : boolean = false;
  public onScrollToSection = output < string > ();
  private current_width : number;
  private previous_width : number;

  // * Método que, dependiendo del ancho de la pantalla, cambia el valor de la variable
  // * boleana 'hidden' cuyo valor esta ligado a la aparición o desaparición de ciertos
  // * elementos del html
  public toggleNavBar () : void {
    if ( window.innerWidth > 460 || this.hidden ) this.hidden = false;
    else if ( window.innerWidth < 460 || !this.hidden ) this.hidden = true;
  }

  // * Método que emite un evento para hacer scroll automático a la sección especificada
  public scrollToSection ( section : string ) : void {
    this.onScrollToSection.emit ( section );
  }
}
