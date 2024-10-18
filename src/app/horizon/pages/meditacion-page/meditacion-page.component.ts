import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector : 'app-meditacion-page',
  templateUrl : './meditacion-page.component.html',
  styleUrls : [ './meditacion-page.component.css' ]
})
export class MeditacionPageComponent {
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
  public start_restart_text : string = "Iniciar";

  @ViewChild ( 'circle' ) circle !: ElementRef<HTMLImageElement>;

  public returnToHomePage () : void {
    this.router.navigateByUrl ( 'horizon-health' );
  }

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

  private startInterval () : void {
    this.interval = setInterval ( () => {
      this.progress++;
    }, this.progress_step );
  }

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

  public cancel ( popup_state: boolean ) : void {
    this.hidden = popup_state;
  }

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
