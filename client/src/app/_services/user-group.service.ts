import { Injectable } from '@angular/core'; 
import {AppComponent} from "../app.component"; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Router} from "@angular/router";   
import { UserGroups } from '../_models/model.userGroup';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
}) 
export class UserGroupService {
  userGroups: UserGroups[] = [];   
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json')};
  constructor(private httpClient:HttpClient, public router: Router) { } 
  create(userGroupsDtl){
    return this.httpClient.post<UserGroups>(AppComponent.API_URL+'/setups/userGroups',userGroupsDtl); 
  } 
  getAll() { 
      return this.httpClient.get<UserGroups[]>(AppComponent.API_URL+'/setups/userGroups',this.options);
  }  
  delete(usrGrpId: number) {  
      return this.httpClient.delete(AppComponent.API_URL+'/setups/userGroups/'+usrGrpId,this.options);
   }  
  update(userGroupsDtl: UserGroups){
    return this.httpClient.post(AppComponent.API_URL+'/setups/userGroups/'+userGroupsDtl.usrGrpId,userGroupsDtl,this.options);
  } 
  getById(usrGrpId: number) {
    return this.httpClient.get<UserGroups>(AppComponent.API_URL +'/setups/userGroups/' + usrGrpId,this.options);
  } 
 enableDisable(userGroupsDtl: UserGroups){ 
  return this.httpClient.post(AppComponent.API_URL+'/setups/userGroups/enableDisable',userGroupsDtl,this.options);
} 
}   