import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginGuard } from '../guards/login.guard';
import { AlreadyLoggedGuard } from '../guards/already-logged.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AlreadyLoggedGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AlreadyLoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
