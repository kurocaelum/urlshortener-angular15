import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing module
import { RoutingModule } from './routing.module';

// Custom components
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule
  ]
})
export class PagesModule { }
