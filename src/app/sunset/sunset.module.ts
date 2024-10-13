/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : sunset.module.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo principal del módulo 'sunset'
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 01/10/2024    Humberto Medina Santos    Se crearon e importaron los diferentes
 *                                         componentes que se usan en el módulo para
 *                                         que sean reconocidos por el mismo:
 *                                         MainPage, Banner, NavBar, Sobre Nosotros
 *                                         y Contacto; además del módulo de rutas y
 *                                         el módulo 'horizon' para su carga perezosa
 *
 * 04/10/2024    Layla González Martínez   Se añadió a los imports el módulo
 *                                         'ReactiveForms' para usar formularios
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { BannerComponent } from './components/banner/banner.component';
import { SunsetRoutingModule } from './sunset-routing.module';
import { HorizonModule } from '../horizon/horizon.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule ( {
  declarations : [
    MainpageComponent,
    BannerComponent,
    NavBarComponent,
    SobreNosotrosComponent,
    ContactoComponent
  ],
  imports : [
    CommonModule,
    SunsetRoutingModule,
    HorizonModule,
    ReactiveFormsModule
  ]
} )
export class SunsetModule { }
