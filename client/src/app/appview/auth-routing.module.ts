import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AppviewComponent } from './appview.component'; 
import { ChangePasswordComponent } from './change-password/change-password.component'; 
import { UserGroupsComponent } from './setups/user-groups/user-groups.component';
import { SchedulesComponent } from './setups/schedules/schedules.component';
import { UserRidesComponent } from './setups/user-rides/user-rides.component';
import { HorsesComponent } from './setups/horses/horses.component';

const routes: Routes =[{
  path: '', component: AppviewComponent, children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'Dashboard' }},
      { path: 'change-password', component: ChangePasswordComponent, data: { breadcrumb: 'Change Password' },  },  
      { path: 'users', component: UserGroupsComponent, data: { breadcrumb: 'Users' }},   
      { path: 'rides', component: UserRidesComponent, data: { breadcrumb: 'My Rides' }},   
      { path: 'schedules', component: SchedulesComponent, data: { breadcrumb: 'Schedules' }},   
      { path: 'horses', component: HorsesComponent, data: { breadcrumb: 'Horses' }}, 
  ]
}]; 
@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class AuthRoutingModule { }
     