import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withViewTransitions } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MeditacionPageComponent } from './pages/meditacion-page/meditacion-page.component';
import { RecomendacionesPageComponent } from './pages/recomendaciones-page/recomendaciones-page.component';
import { EnsenanzaPageComponent } from './pages/ensenanza-page/ensenanza-page.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import ( '../auth/auth.module' ).then ( m => m.AuthModule )
  },
  {
    path: '',
    component: LayoutComponent,
    component: LayoutComponent,

    children: [
      { path: '', title: 'Horizon Health', component: HomePageComponent },
      { path: 'meditacion', title: 'Meditacion', component: MeditacionPageComponent },
      { path: 'recomendaciones', title: 'Recomendaciones', component: RecomendacionesPageComponent },
      { path: 'enseñanza', title: 'Enseñanza Del Dia', component: EnsenanzaPageComponent },
      { path: 'profile', title: 'Profile', component: ProfilePageComponent },
      { path: '**', redirectTo: '' }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
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
