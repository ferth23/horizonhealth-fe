import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { BannerComponent } from './components/banner/banner.component';



@NgModule({
  declarations: [
    MainpageComponent,
    BannerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SunsetModule { }
