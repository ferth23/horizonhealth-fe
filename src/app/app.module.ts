/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : app.module.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo principal del módulo principal de la app
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 01/10/2024    Humberto Medina Santos    Se creó el archivo
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule ( {
  declarations : [
    AppComponent,
  ],
  imports : [
    BrowserModule,
    AppRoutingModule
  ],
  providers : [],
  bootstrap : [ AppComponent ]
} )
export class AppModule { }
