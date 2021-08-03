import { Injectable } from '@angular/core'; 
import { TranslateService } from '@ngx-translate/core'; 
import { Params, Router } from '@angular/router'; 
import { Menu } from '../appview/menu/menu.model';
import { PageParams } from '../_models/model.pageParams';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private router:Router) {

  }
  pageParams:PageParams; 
  navigate(route,menu:Menu){ 
    console.log("route",route)
    let myParam:Params = {menu:menu , menuType : menu.routerLink, refresh: new Date().getTime()}; 
    return this.router.navigate([route],{skipLocationChange: true,  queryParams: myParam });
  } 
}
