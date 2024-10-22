import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component ( {
  selector : 'app-recomendaciones-page',
  templateUrl : './recomendaciones-page.component.html',
  styleUrls : [ './recomendaciones-page.component.css' ]
} )
export class RecomendacionesPageComponent {
  private router = inject ( Router );
  public e_visible : boolean = false;
  public l_visible : boolean = true;
  public a_visible : boolean = false;

  @ViewChild ( 'ejercicios_item' ) ejercicios_item !: ElementRef < HTMLDivElement >;
  @ViewChild ( 'lectura_item' ) lectura_item !: ElementRef < HTMLDivElement >;
  @ViewChild ( 'actividades_item' ) actividades_item !: ElementRef < HTMLDivElement >;

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
