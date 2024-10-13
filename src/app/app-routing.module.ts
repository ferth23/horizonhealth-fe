/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : app-routing.module.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de rutas principal de la app
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 02/10/2024    Humberto Medina Santos    Se añadió la ruta para cargar de manera
 *                                         perezosa el módulo 'sunset'
 *
 * 04/10/2024    Humberto Medina Santos    Se añadió un provider para mostrar
 *                                         transiciones suaves al cambiar de página
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withViewTransitions } from '@angular/router';

const routes : Routes = [
  {
    path : '',
    loadChildren : () => import ( './sunset/sunset.module' ).then ( m => m.SunsetModule )
  },
  {
    path : '**',
    redirectTo : ''
  }
];

@NgModule ( {
  imports : [ RouterModule.forRoot ( routes ) ],
  exports : [ RouterModule ],

  providers : [
    provideRouter (
      routes,
      withViewTransitions ( {
        skipInitialTransition : true
      } )
    )
  ]
} )
export class AppRoutingModule { }
