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
 * 10/10/2024    Humberto Medina Santos    Se creó el arreglo con la información
 *                                         de cada preview de cada sección para
 *                                         iteralos en el html y se implementó
 *                                         el método para navegar hacia cada sección
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { Component, inject, signal } from '@angular/core';
import { SectionItem } from '../../interfaces/SectionItem';
import { Router } from '@angular/router';

@Component ( {
  selector : 'app-home-page',
  templateUrl : './home-page.component.html',
  styleUrls : [ './home-page.component.css' ]
} )
export class HomePageComponent {

  constructor () {
    this.premium = localStorage.getItem ( 'premium' );
    if ( this.premium === "1" ) this.is_premium = true;
  }

  // * Declaración de variables y dependencias
  private router = inject ( Router );
  public hidden : boolean = false;
  public test_hidden : boolean = false;
  public is_premium : boolean = false;
  private premium !: string | null;

  // * Arreglo que contiene la información de los items de las previews de las secciones
  // * de la página principal de Horizon Health para poder iterarlos en el html
  public SectionItems = signal < SectionItem [] > ( [
    {
      img_src : 'meditacion.svg',
      img_alt : 'Meditación',
      title : 'Meditación',
      text : 'Encuentra tu centro y reduce el estrés con nuestras prácticas guiadas de meditación.',
      background_color : 'background-color: #FFFFFF;',
      font_color : 'color: #73ABDE;',
      button_color : 'background: linear-gradient(90deg, rgba(115,171,222,1) 0%, rgba(107,202,222,1) 100%);',
      section_route : 'horizon-health/meditacion'
    },
    {
      img_src : 'recomendaciones.svg',
      img_alt : 'Recomendaciones',
      title : 'Recomendaciones',
      text : 'Descubre libros, ejercicios y actividades seleccionados para potenciar tu bienestar.',
      background_color : 'background-color: #6E214E;',
      font_color : 'color: #FDCD79;',
      button_color : 'background: linear-gradient(90deg, rgba(253,205,121,1) 0%, rgba(255,246,145,1) 100%);',
      section_route : 'horizon-health/recomendaciones'
    },
    {
      img_src : 'enseñanza.svg',
      img_alt : 'Enseñanza Diaria',
      title : 'Enseñanza Diaria',
      text : 'Inspírate con lecciones diarias diseñadas para ayudarte a crecer y a reflexionar.',
      background_color : 'background-color: #FFFFFF;',
      font_color : 'color: #9A76B4;',
      button_color : 'background: linear-gradient(90deg, rgba(154,118,180,1) 0%, rgba(221,134,185,1) 100%);',
      section_route : 'horizon-health/enseñanza'
    }
  ] );

  // * Método que utiliza el módulo de rutas para navegar hacia la ruta especificada
  public goToSection ( section : string ) {
    this.router.navigateByUrl ( section );
  }
}
