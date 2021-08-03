import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core'; 
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { TranslateModule } from '@ngx-translate/core'; 
import { NgxSpinnerModule } from 'ngx-spinner'; 
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../meterial.module';
import { AlertModule } from '../_alert';
import { PageBase } from '../appview/components/PageBase.component';
import { AppInjector } from '../utils/AppInjector';
import { MatDataTableComponent } from '../appview/components/mat-data-table/mat-data-table.component';
import { DataTableComponent } from '../appview/components/data-table/data-table.component';
@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule, 
    NgxSpinnerModule,
    MatTableModule, 
    MaterialModule,
    AlertModule,
  ],
  declarations: [ 
    PageBase, 
    DataTableComponent, 
    MatDataTableComponent,
], 
exports: [
  PageBase, 
  DataTableComponent, 
  MatDataTableComponent,
],
entryComponents: [],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ComponentsModule {
    constructor(private injector: Injector){
      AppInjector.injector = this.injector;
    }
 }
