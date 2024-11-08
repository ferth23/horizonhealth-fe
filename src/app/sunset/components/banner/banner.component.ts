/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : banner.component.ts
 * Autor         : María Fernanda Torres Herrera
 * Fecha         : 01/10/2024
 * Descripción   : Lógica del componente Banner
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 04/10/2024    Humberto Medina Santos    Se añadió el método 'goToHorizon()', el
 *                                         cual redirige a la página del proyecto
 *                                         Horizon Health
 *
 * 12/10/2024    María Torres Herrera      Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component ( {
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: [ './banner.component.css' ]
} )
export class BannerComponent {
  private router = inject ( Router );

  // * Método que redirige a la página del proyecto Horizon Health
  public goToHorizon (): void {
    this.router.navigateByUrl ( 'horizon-health/auth/log-in' );
  }
}
