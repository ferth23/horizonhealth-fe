/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : auth.module.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 08/10/2024
 * Descripción   : Archivo principal del módulo 'auth'
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 08/10/2024    Humberto Medina Santos    Se creó el archivo
 *
 * 09/10/2024    María Torres Herrera      Se añadió a los imports el módulo
 *                                         'ReactiveForms' para usar formularios
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule ( {
  declarations : [
    LogInPageComponent,
    RegisterPageComponent
  ],
  imports : [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
} )
export class AuthModule { }
