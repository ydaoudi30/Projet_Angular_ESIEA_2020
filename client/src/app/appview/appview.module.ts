import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppviewComponent } from './appview.component'; 
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MaterialModule } from '../meterial.module'; 
import { ComponentsModule } from '../shareModule/components.module';
import { ChangePasswordComponent } from './change-password/change-password.component'; 
import { UserGroupsComponent } from './setups/user-groups/user-groups.component'; 
import { AddEditUserComponent } from './setups/user-groups/add-edit-user/add-edit-user.component'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './menu/vertical-menu/vertical-menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { SchedulesComponent } from './setups/schedules/schedules.component';
import { UserRidesComponent } from './setups/user-rides/user-rides.component';
import { HorsesComponent } from './setups/horses/horses.component';
import { AddEditHorsesComponent } from './setups/horses/add-edit-horses/add-edit-horses.component';
import { AddEditScheduleComponent } from './setups/schedules/add-edit-schedule/add-edit-schedule.component';
@NgModule({ 
  declarations: [ 
    AppviewComponent,
    SideMenuComponent,
    ChangePasswordComponent,
    UserGroupsComponent, 
    AddEditUserComponent,
    SidenavComponent,
    VerticalMenuComponent,
    BreadcrumbComponent,
    NotificationsComponent,
    UserMenuComponent,
    SchedulesComponent,
    UserRidesComponent,
    HorsesComponent,
    AddEditHorsesComponent,
    AddEditScheduleComponent
  ],
    imports: [
      ComponentsModule,
      CommonModule,
      AuthRoutingModule,
      LayoutModule, 
      FormsModule,
      ReactiveFormsModule,
      MatToolbarModule,
      MatButtonModule, 
      CommonModule, 
      MatButtonModule, 
      MatTabsModule,
      MatToolbarModule, 
      MatStepperModule,
      ReactiveFormsModule,
      FormsModule,
      MatFormFieldModule, 
      MatInputModule, 
      MatDatepickerModule,
      MatNativeDateModule, 
      MatTableModule,
      MatPaginatorModule,
      MatSortModule, 
      MatSlideToggleModule,
      MatDialogModule, 
      NgxSpinnerModule,
      MaterialModule,
      FlexLayoutModule],      
      entryComponents: [AddEditUserComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        // {
        //     provide: PERFECT_SCROLLBAR_CONFIG,
        //     useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        // }
      ]
})
export class AppviewModule { }
