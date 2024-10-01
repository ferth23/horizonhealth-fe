import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeditacionPageComponent } from './pages/meditacion-page/meditacion-page.component';
import { RecomendacionesPageComponent } from './pages/recomendaciones-page/recomendaciones-page.component';
import { EnsenanzaPageComponent } from './pages/ensenanza-page/ensenanza-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HorizonRoutingModule } from './horizon-routing.module';

@NgModule({
  declarations: [
    MeditacionPageComponent,
    RecomendacionesPageComponent,
    EnsenanzaPageComponent,
    HomePageComponent,
    LogInPageComponent,
    RegisterPageComponent
  ],
  imports: [CommonModule],
  exports: [HorizonRoutingModule]
})
export class HorizonModule { }
