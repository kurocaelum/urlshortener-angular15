import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing module
import { RoutingModule } from './routing.module';

// Custom components
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class PagesModule { }
