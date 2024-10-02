import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withViewTransitions } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import ( './sunset/sunset.module' ).then ( m => m.SunsetModule )
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
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
export class AppRoutingModule { }
