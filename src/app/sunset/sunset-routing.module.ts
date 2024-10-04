import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withViewTransitions } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';

const routes: Routes = [
  {
    path: '',

    children: [
      { path: '', title: 'Sunset Wellness', component: MainpageComponent },

      {
        path: 'horizon-health',
        loadChildren: () => import ( '../horizon/horizon.module' ). then ( m => m.HorizonModule )
      },

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
export class SunsetRoutingModule { }
