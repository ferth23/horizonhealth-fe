/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : meditacion-page.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript del componente MeditacionPage
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 15/10/2024    Humberto Medina Santos    Se agregó el método returnToHomePage()
 *                                         para poder navegar hacia dicha página
 *                                         al hacer clic en un botón
 *
 * 16/10/2024    Humberto Medina Santos    Se añadió el método start() para iniciar
 *                                         con el ejercicio de meditación
 *
 * 17/10/2024    Humberto Medina Santos    Se agregaron los siguientes métodos:
 *                                              - startInterval()
 *                                              - startResumeTimeOut()
 *                                              - cancel()
 *                                              - toggleStopResume()
 *                                              - toggleStartRestart()
 *                                         terminando de esta manera la
 *                                         implementación de todas las
 *                                         funcionalidades del componente
 * ---------------------------------------------------------------------------- */

import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector : 'app-meditacion-page',
  templateUrl : './meditacion-page.component.html',
  styleUrls : [ './meditacion-page.component.css' ]
})
export class MeditacionPageComponent {

  // * Declaración de variables y dependencias
  private router = inject ( Router );
  private progress_step : number = 0;
  private start_time : number = 0;
  private remaining_time : number = 0;
  private time : number = 0;
  private interval !: any;
  private timeout !: any;
  public hidden : boolean = false;
  public button_hidden : boolean = true;
  public isStopped : boolean = false;
  public progress : number = 0;
  public start_restart_text : string = "Iniciar"

  // * Variable que permite obtener del DOM la imagen del círculo
  @ViewChild ( 'circle' ) circle !: ElementRef<HTMLImageElement>;

  // * Método que permite navegar hacia la página Home
  public returnToHomePage () : void {
    this.router.navigateByUrl ( 'horizon-health' );
  }

  // * Método que inicia el ejercicio de respiración, iniciando el tiempo,
  // * la barra de progreso, y la animación del ávatar y el círculo
  public start ( minutes : number ) : void {
    this.button_hidden = false;
    this.start_restart_text = "Reiniciar";
    this.progress = 0;
    this.hidden = true;
    this.time = minutes * 60000;
    this.progress_step = this.time / 100;
    this.circle.nativeElement.classList.add ( 'animate' );
    this.startInterval ();
    this.startResumeTimeOut ( this.time );
  }

  // * Método que inicia un intervalo de tiempo tal que cada cierta cantidad de
  // * milisegundos vaya aumentando 1% del progreso de la barra de progreso
  private startInterval () : void {
    this.interval = setInterval ( () => {
      this.progress++;
    }, this.progress_step );
  }

  // * Método que inicia un timer que durará el tiempo en minutos que el usuario
  // * especifique, realizando diversas acciones al momento de su terminación
  private startResumeTimeOut ( time_out : number ) : void {
    this.start_time = Date.now ();
    this.timeout = setTimeout ( () => {
      clearInterval ( this.interval );
      this.circle.nativeElement.classList.remove ( 'animate' );
      this.hidden = false;
      this.start_restart_text = "Iniciar";
      this.button_hidden = true;
      this.isStopped = false;
      this.progress = 0;
    }, time_out );
  }

  // * Método que oculta el componente MeditacionPopUp al hacer clic en su botón 'Cancelar'
  public cancel ( popup_state: boolean ) : void {
    this.hidden = popup_state;
  }

  // * Método para pausar o resumir el ejercicio de meditación dependiendo del estado
  // * en el que se encuentre (En pausa o activo)
  public toggleStopResume () : void {
    if ( this.isStopped ) {
      this.start_time = Date.now ();
      this.circle.nativeElement.classList.add ( 'animate' );
      this.startInterval ();
      this.startResumeTimeOut ( this.remaining_time );
    } else {
      this.circle.nativeElement.classList.remove ( 'animate' );
      clearInterval ( this.interval );
      clearTimeout ( this.timeout );
      this.remaining_time = this.time - ( Date.now () - this.start_time );
    }

    this.isStopped = !this.isStopped;
  }

  // * Método para reiniciar el ejercicio de meditación o, en caso de que se haya dado
  // * al botón de cancelar en el componente MeditacionPopUp haciendo que este
  // * desaparezca, se pueda volver a hacer aparecer para iniciar con el ejercicio
  public toggleStartRestart () : void {
    this.circle.nativeElement.classList.remove ( 'animate' );
    clearInterval ( this.interval );
    clearTimeout ( this.timeout );
    this.hidden = false;
    this.button_hidden = true;
    this.start_restart_text = "Iniciar";
    this.isStopped = false;
    this.progress = 0;
  }
}
