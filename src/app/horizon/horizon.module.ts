import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeditacionPageComponent } from './pages/meditacion-page/meditacion-page.component';
import { RecomendacionesPageComponent } from './pages/recomendaciones-page/recomendaciones-page.component';
import { EnsenanzaPageComponent } from './pages/ensenanza-page/ensenanza-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HorizonRoutingModule } from './horizon-routing.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MeditacionPageComponent,
    RecomendacionesPageComponent,
    EnsenanzaPageComponent,
    HomePageComponent,
    LayoutComponent,
    NavBarComponent,
    ProfilePageComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [HorizonRoutingModule]
})
export class HorizonModule { }
