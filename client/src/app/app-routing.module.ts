import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component'; 
import { UrlPermission } from './utils/url.permission';
const routes: Routes = [
  // UrlPermission will check if user is login already if not then it will go onto login page
  { path: 'auth', loadChildren: () => import('./appview/appview.module').then(m => m.AppviewModule),canActivate: [UrlPermission] }, 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'register', component: RegistrationComponent },

  {path: '**', redirectTo: 'auth'},
]

@NgModule({ 
 imports: [RouterModule.forRoot(routes, { useHash: true })], 
 exports: [RouterModule] 
})
export class AppRoutingModule { }
