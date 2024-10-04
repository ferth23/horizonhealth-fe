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

@NgModule({
  declarations: [
    MainpageComponent,
    BannerComponent,
    NavBarComponent,
    SobreNosotrosComponent,
    ContactoComponent
  ],
  imports: [
    CommonModule,
    SunsetRoutingModule,
    HorizonModule,
    ReactiveFormsModule
  ]
})
export class SunsetModule { }
