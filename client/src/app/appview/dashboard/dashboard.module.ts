import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardComponent } from './dashboard.component'; 
import { ComponentsModule } from '../../shareModule/components.module';

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, 
    PerfectScrollbarModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent, 
  ]
})
export class DashboardModule { }
