/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : sunset-routing.module.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de rutas principal del módulo 'sunset'
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 02/10/2024    Humberto Medina Santos    Se añadió la ruta hacia la página
 *                                         principal de Sunset Wellness y la ruta para
 *                                         cargar de manera perezosa el módulo 'horizon'
 *
 * 04/10/2024    Humberto Medina Santos    Se añadió un provider para mostrar
 *                                         transiciones suaves al cambiar de página
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withViewTransitions } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';

const routes : Routes = [
  {
    path : '',

    children : [
      { path : '', title : 'Sunset Wellness', component : MainpageComponent },

      {
        path : 'horizon-health',
        loadChildren : () => import ( '../horizon/horizon.module' ). then ( m => m.HorizonModule )
      },

      { path : '**', redirectTo : '' }
    ]
  }
]

@NgModule ( {
  imports : [ RouterModule.forChild ( routes ) ],
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
export class SunsetRoutingModule { }
