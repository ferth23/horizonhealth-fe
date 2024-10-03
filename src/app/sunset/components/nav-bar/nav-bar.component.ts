import { Component, HostListener, output, signal } from '@angular/core';
import { NavBarItem } from '../../interfaces/NavBarItem';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor() {
    this.current_width = window.innerWidth;
    this.previous_width = window.innerWidth;
    this.toggleNavBar();
  }

  @HostListener ( 'window:resize', ['$event'] )
  onResize ( event: any ) {
    this.previous_width = this.current_width;
    this.current_width = event.target.innerWidth;
    if (this.current_width !== this.previous_width) this.toggleNavBar();
  }

  public NavBarItems = signal <NavBarItem[]> ([
    { name: 'Inicio',   section: 'inicio'   },
    { name: 'Acerca',   section: 'acerca'   },
    { name: 'Contacto', section: 'contacto' },
  ]);

  public hidden: boolean = false;
  public onScrollToSection = output <string> ();
  private current_width: number;
  private previous_width: number;

  public toggleNavBar(): void {
    if ( window.innerWidth > 460 || this.hidden ) this.hidden = false;
    else if ( window.innerWidth < 460 || !this.hidden ) this.hidden = true;
  }

  public scrollToSection ( section: string ): void {
    this.onScrollToSection.emit(section);
  }
}
