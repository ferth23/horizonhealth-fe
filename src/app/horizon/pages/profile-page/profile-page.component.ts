import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector : 'profile-page',
  templateUrl : './profile-page.component.html',
  styleUrl : './profile-page.component.css'
})
export class ProfilePageComponent {
  selectedOption : string = 'edit-profile';
  hidden : boolean = true;
  private current_width : number;
  private previous_width : number;

  @ViewChild ( 'overlay' ) overlay !: ElementRef<HTMLDivElement>;

  // * Constructor del componente donde se inicializa el ancho de la pantalla y se
  // * manda a llamar al método toggleSettings
  constructor () {
    this.current_width = window.innerWidth;
    this.previous_width = window.innerWidth;
    this.toggleSettings ();
  }

  // * Evento que detecta cuando el ancho de la pantalla cambia y dependiendo del
  // * nuevo valor manda a llamar al método toggleSettings
  @HostListener ( 'window:resize', [ '$event' ] )
  onResize ( event : any ) {
    this.previous_width = this.current_width;
    this.current_width = event.target.innerWidth;
    if ( this.current_width !== this.previous_width ) this.toggleSettings();
  }

  selectOption ( option: string ) {
    this.selectedOption = option;
    this.toggleSettings();
  }

  // * Método que, dependiendo del ancho de la pantalla, cambia el valor de la variable
  // * boleana 'hidden' cuyo valor esta ligado a la aparición o desaparición de ciertos
  // * elementos del html y aparece o desaparece un overlay
  toggleSettings () {
    if ( ( window.innerWidth >= 460 || this.hidden ) && this.overlay ) {
      this.hidden = false;
      this.overlay.nativeElement.style.display = "block";
    } else if ( ( window.innerWidth <= 460 || !this.hidden ) && this.overlay ) {
      this.hidden = true;
      this.overlay.nativeElement.style.display = "none";
    }
  }
}
