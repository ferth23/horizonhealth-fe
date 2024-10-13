/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : mainpage.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript de componente MainPage
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 04/10/2024    Humberto Medina Santos    Se añadió el método para hacer scroll
 *                                         automático a una sección en específico
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { Component } from '@angular/core';

@Component ( {
  selector : 'app-mainpage',
  templateUrl : './mainpage.component.html',
  styleUrls : [ './mainpage.component.css' ]
} )
export class MainpageComponent {

  //* Método que recibe una sección de la página como string y hace un scroll automático
  //* y suave hacia la misma
  public scrollToSection ( section: string ) : void {
    const section_elem = document.getElementById ( section );
    if ( section_elem ) section_elem.scrollIntoView ( { behavior: 'smooth' } );
  }

}
