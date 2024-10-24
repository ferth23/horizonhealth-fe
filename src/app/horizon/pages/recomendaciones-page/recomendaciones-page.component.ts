/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : home-page.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript del componente HomePage
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 21/10/2024    Humberto Medina Santos    Se creó toda la funcionalidad del
 *                                         sistema de pestañas y de la página
 *                                         en general
 * ---------------------------------------------------------------------------- */

import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component ( {
  selector : 'app-recomendaciones-page',
  templateUrl : './recomendaciones-page.component.html',
  styleUrls : [ './recomendaciones-page.component.css' ]
} )
export class RecomendacionesPageComponent {

  // * Declaración de variables e injección de dependencias
  private router = inject ( Router );
  public e_visible : boolean = false;
  public l_visible : boolean = true;
  public a_visible : boolean = false;

  // * Objetos obtenidos del DOM
  @ViewChild ( 'ejercicios_item' ) ejercicios_item !: ElementRef < HTMLDivElement >;
  @ViewChild ( 'lectura_item' ) lectura_item !: ElementRef < HTMLDivElement >;
  @ViewChild ( 'actividades_item' ) actividades_item !: ElementRef < HTMLDivElement >;

  // * Método que muestra el contenido de la pestaña seleccionada y oculta las demás
  public selectTab ( tab : string ) : void {
    switch ( tab ) {
      case 'ejercicios':
        this.ejercicios_item.nativeElement.classList.add ( 'selected' );
        this.lectura_item.nativeElement.classList.remove ( 'selected' );
        this.actividades_item.nativeElement.classList.remove ( 'selected' );
        this.e_visible = true;
        this.l_visible = false;
        this.a_visible = false;
        break;
      case 'lectura':
        this.ejercicios_item.nativeElement.classList.remove ( 'selected' );
        this.lectura_item.nativeElement.classList.add ( 'selected' );
        this.actividades_item.nativeElement.classList.remove ( 'selected' );
        this.e_visible = false;
        this.l_visible = true;
        this.a_visible = false;
        break;
      case 'actividades':
        this.ejercicios_item.nativeElement.classList.remove ( 'selected' );
        this.lectura_item.nativeElement.classList.remove ( 'selected' );
        this.actividades_item.nativeElement.classList.add ( 'selected' );
        this.e_visible = false;
        this.l_visible = false;
        this.a_visible = true;
        break;
    }
  }

  // * Método que permite navegar hacia la página Home
  public returnToHomePage () : void {
    this.router.navigateByUrl ( 'horizon-health' );
  }
}
