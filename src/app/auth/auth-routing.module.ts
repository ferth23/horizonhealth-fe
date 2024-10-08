import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',

    children: [
      { path: 'log-in', title: 'Log In', component: LogInPageComponent },
      { path: 'register', title: 'Register', component: RegisterPageComponent },
      { path: '**', redirectTo: 'log-in' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
