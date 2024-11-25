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
 *
 * 15/11/2024    María Torres Herrera      Se añadieron los métodos 'getCreationDate()'
 *                                         y 'checkPopUpVisibility()', los cuales
 *                                         tienen la función de mostrar el test
 *                                         semanal utilizando la fecha actual
 *
 * 19/11/2024    María Torres Herrera      Se añadió el método 'getLastWeeklyTestDate()',
 *                                         el cual obtiene la fecha del test más
 *                                         reciente que el usuario respondió
 *
 * 19/11/2024    María Torres Herrera      Se modificó el método 'checkPopUpVisibility()'
 *                                         para que el test solo pueda responderse
 *                                         una vez en el día
 * ---------------------------------------------------------------------------- */

import { Component, inject, signal } from '@angular/core';
import { SectionItem } from '../../interfaces/SectionItem';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { UserResponse } from 'src/app/auth/interfaces/user-response.interface';
import Swal from 'sweetalert2';
import { TestService } from '../../services/test.service';
import { DailyTestService } from '../../services/daily-test.service';

@Component ( {
  selector : 'app-home-page',
  templateUrl : './home-page.component.html',
  styleUrls : [ './home-page.component.css' ]
} )
export class HomePageComponent {

  // * Constructor del componente en donde se obtiene la variable 'premium'
  // * del localStorage para saber si el usuario es premium o no
  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
    this.premium = localStorage.getItem ( 'premium' );
    this.getCreationDate();
  }

  // * Declaración de variables y dependencias
  private router = inject ( Router );
  private user_service = inject ( UserService );
  private test_service = inject ( TestService );
  private daily_test_service = inject ( DailyTestService );
  private user !: UserResponse;
  public hidden : boolean = false;
  public test_hidden : boolean = false;
  private premium !: string | null;
  private creation_date: Date | null = null;
  private user_id !: string | null;
  public showWeeklyPopup : boolean = false;
  public showDailyPopup : boolean = false;
  private last_weekly_test_date : Date | null = null;
  private last_daily_test_date : Date | null = null;

  // * Obtiene la fecha de creación de la cuenta de usuario
  getCreationDate () {
    this.user_service.getUserById ( this.user_id ).subscribe ( {
      next: ( user ) => {
        this.user = user[0];
        this.creation_date = this.user.fecha_de_creacion;
        if ( this.premium === "1" ) this.getLastWeeklyTestDate();
        this.getLastDailyTestDate();
      },
      error: ( message => Swal.fire ( 'Error', message, 'error' ) )
    } );
  }

  // * Obtiene la fecha del último test semanal que el usuario respondió
  getLastWeeklyTestDate () {
    this.test_service.obtenerPuntajes ( this.user_id ).subscribe ( {
      next: ( res ) => {
        this.last_weekly_test_date = res[0].fecha_d;
        this.checkPopUpVisibility ( 'weekly' );
      },
      error: () => {
        this.last_weekly_test_date = null;
        this.checkPopUpVisibility ( 'weekly' );
      }
    } );
  }

  // * Obtiene la fecha del último test diario que el usuario respondió
  getLastDailyTestDate () {
    this.daily_test_service.obtenerFechaTest ( this.user_id ).subscribe ( {
      next: ( { fechaTestDiario } ) => {
        this.last_daily_test_date = fechaTestDiario;
        this.checkPopUpVisibility ( 'daily' );
      },
      error: () => {
        this.last_daily_test_date = null;
        this.checkPopUpVisibility ( 'daily' );
      }
    } );
  }

  // * Método que revisa si debe aparecer el Pop Up del test semanal
  checkPopUpVisibility ( test : string ) {
    const now = new Date();

    if ( this.creation_date ) {
      const creationDate = new Date ( this.creation_date );

      if ( test === 'weekly' ) {
        if ( this.last_weekly_test_date ) {
          const lastTestDate = new Date ( this.last_weekly_test_date );
          const daysSinceLastTest = Math.floor ( ( now.getTime() - lastTestDate.getTime () ) / ( 1000 * 60 * 60 * 24 ) );
          this.showWeeklyPopup = daysSinceLastTest >= 7;
        } else {
          const daysSinceCreation = Math.floor ( ( now.getTime() - creationDate.getTime () ) / ( 1000 * 60 * 60 * 24 ) );
          this.showWeeklyPopup = daysSinceCreation >= 7;
        }
      } else if ( test === 'daily' ) {
        if ( this.last_daily_test_date ) {
          const lastTestDate = new Date ( this.last_daily_test_date );
          const hoursSinceLastTest = Math.floor ( ( now.getTime() - lastTestDate.getTime () ) / ( 1000 * 60 * 60 ) );
          this.showDailyPopup = hoursSinceLastTest >= 24;
        } else this.showDailyPopup = true;
      }
    }

  }

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
