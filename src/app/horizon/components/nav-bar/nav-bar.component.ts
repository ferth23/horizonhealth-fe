import { Component, HostListener, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarItem } from 'src/app/sunset/interfaces/NavBarItem';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor() {
    this.current_width = window.innerWidth;
    this.previous_width = window.innerWidth;
    this.toggleNavBar();
    this.toggleNavLogIn();
    this.toggleLogIn();
  }

  @HostListener ( 'window:resize', ['$event'] )
  onResize ( event: any ) {
    this.previous_width = this.current_width;
    this.current_width = event.target.innerWidth;

    if (this.current_width !== this.previous_width) {
      this.toggleNavBar();
      this.toggleNavLogIn();
    }

    this.toggleLogIn();
  }

  public NavBarItems = signal <NavBarItem[]> ([
    { name: 'Inicio',          route: 'horizon-health'                 },
    { name: 'Meditación',      route: 'horizon-health/meditacion'      },
    { name: 'Recomendaciones', route: 'horizon-health/recomendaciones' },
    { name: 'Enseñanza',       route: 'horizon-health/enseñanza'       }
  ]);

  public hidden: boolean = false;
  public login_hidden: boolean = false;
  public nav_login_hidden: boolean = true;
  private current_width: number;
  private previous_width: number;
  private router = inject(Router);

  public toggleNavBar(): void {
    if ( window.innerWidth >= 768 || this.hidden ) this.hidden = false;
    else if ( window.innerWidth <= 768 || !this.hidden ) this.hidden = true;
  }

  public toggleLogIn(): void {
    if ( window.innerWidth >= 768 ) this.login_hidden = false;
    else if ( window.innerWidth <= 768 ) this.login_hidden = true;
  }

  public toggleNavLogIn(): void {
    if ( window.innerWidth >= 768 && !this.nav_login_hidden ) this.nav_login_hidden = true;
    else if ( window.innerWidth <= 768 && this.nav_login_hidden ) this.nav_login_hidden = false;
  }

  public goToLogIn(): void {
    this.router.navigateByUrl('horizon-health/auth/log-in');
  }
}
