import { Component } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent {
  public scrollToSection ( section: string ): void {
    const seccion = document.getElementById(section);
    if (seccion) seccion.scrollIntoView ( { behavior: 'smooth' } );
  }
}
