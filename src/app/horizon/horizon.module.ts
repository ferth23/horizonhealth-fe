/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : horizon.module.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo principal del módulo 'horizon'
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 01/10/2024    Humberto Medina Santos    Se crearon e importaron los diferentes
 *                                         componentes que se usan en el módulo para
 *                                         que sean reconocidos por el mismo:
 *                                         EnsenanzaPage, HomePage, MeditacionPage,
 *                                         y RecomendacionesPage; además del módulo de rutas
 *
 * 08/10/2024    Humberto Medina Santos    Se crearon e importaron los componentes
 *                                         ProfilePage, NavBar y Layout
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeditacionPageComponent } from './pages/meditacion-page/meditacion-page.component';
import { RecomendacionesPageComponent } from './pages/recomendaciones-page/recomendaciones-page.component';
import { EnsenanzaPageComponent } from './pages/ensenanza-page/ensenanza-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HorizonRoutingModule } from './horizon-routing.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RouterModule } from '@angular/router';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { MeditacionPopUpComponent } from './components/meditacion-pop-up/meditacion-pop-up.component';

@NgModule ( {
  declarations : [
    MeditacionPageComponent,
    RecomendacionesPageComponent,
    EnsenanzaPageComponent,
    HomePageComponent,
    LayoutComponent,
    NavBarComponent,
    ProfilePageComponent,
    PopUpComponent,
    MeditacionPopUpComponent
  ],
  imports : [ CommonModule, RouterModule, FormsModule ],
  exports : [ HorizonRoutingModule ]
} )
export class HorizonModule { }
