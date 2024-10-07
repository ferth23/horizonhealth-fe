import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeditacionPageComponent } from './pages/meditacion-page/meditacion-page.component';
import { RecomendacionesPageComponent } from './pages/recomendaciones-page/recomendaciones-page.component';
import { EnsenanzaPageComponent } from './pages/ensenanza-page/ensenanza-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HorizonRoutingModule } from './horizon-routing.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    MeditacionPageComponent,
    RecomendacionesPageComponent,
    EnsenanzaPageComponent,
    HomePageComponent,
    LogInPageComponent,
    RegisterPageComponent,
    LayoutComponent,
    NavBarComponent,
    ProfilePageComponent
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [HorizonRoutingModule]
})
export class HorizonModule { }
