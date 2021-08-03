import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class UrlPermission implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    let token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    if (token != null && token != '') { 
      // logged in so return true
      return true;
    }else{
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
    return false;
    }
  }
}
