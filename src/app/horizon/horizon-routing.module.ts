import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withViewTransitions } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MeditacionPageComponent } from './pages/meditacion-page/meditacion-page.component';
import { RecomendacionesPageComponent } from './pages/recomendaciones-page/recomendaciones-page.component';
import { EnsenanzaPageComponent } from './pages/ensenanza-page/ensenanza-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      { path: '', title: 'Horizon Health', component: HomePageComponent },
      { path: 'meditacion', title: 'Meditacion', component: MeditacionPageComponent },
      { path: 'recomendaciones', title: 'Recomendaciones', component: RecomendacionesPageComponent },
      { path: 'enseñanza', title: 'Enseñanza Del Dia', component: EnsenanzaPageComponent },
      { path: 'log-in', title: 'Log In', component: LogInPageComponent },
      { path: 'register', title: 'Register', component: RegisterPageComponent },
      { path: 'profile', title: 'Profile', component: ProfilePageComponent },
      { path: '**', redirectTo: '' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true
      })
    )
  ]
})
export class HorizonRoutingModule { }
