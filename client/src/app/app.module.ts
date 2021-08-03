import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LandingPageComponent } from './landing-page/landing-page.component'; 
import { AuthService } from './_services/auth.service';
import { AccountService } from './_services/account.service'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './meterial.module'; 
import { RegistrationCntComponent } from './registration-cnt/registration-cnt.component'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from './shareModule/components.module';
import { MatTableModule } from '@angular/material/table';
import { AlertModule } from './_alert';
import { AppSettings } from './app.settings';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { UrlPermission } from './utils/url.permission';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './utils/custom-overlay-container';
import { AppInterceptor } from './utils/app.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LandingPageComponent, 
    RegistrationCntComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    ComponentsModule,
    MatTableModule,
    AlertModule,
    FlexLayoutModule
  ], 
  entryComponents: [LoginComponent,RegistrationComponent,RegistrationCntComponent],
  providers: [ AppSettings,AuthService,AccountService,UrlPermission,
              {provide: HTTP_INTERCEPTORS,useClass: AppInterceptor,multi: true},
              { provide: OverlayContainer, useClass: CustomOverlayContainer }],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
