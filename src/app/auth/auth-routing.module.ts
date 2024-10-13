/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : auth-routing.module.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 08/10/2024
 * Descripción   : Archivo de rutas principal del módulo 'auth'
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 08/10/2024    Humberto Medina Santos    Se añadieron las rutas para ir hacia
 *                                         el Log In y Register

 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados y un provider
 *                                         para mostrar transiciones suaves al
 *                                         cambiar de página
 * ---------------------------------------------------------------------------- */

import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withViewTransitions } from '@angular/router';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes : Routes = [
  {
    path : '',

    children : [
      { path : 'log-in', title : 'Log In', component : LogInPageComponent },
      { path : 'register', title : 'Register', component : RegisterPageComponent },
      { path : '**', redirectTo : 'log-in' }
    ]
  },

];

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
export class AuthRoutingModule { }
