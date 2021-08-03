import { Injectable } from '@angular/core'; 
import {AppComponent} from "../app.component"; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Router} from "@angular/router";   
import { UserGroups } from '../_models/model.userGroup';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})  
export class DataGridService {
  userGroups: UserGroups[] = [];   
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json')};
  constructor(private httpClient:HttpClient, public router: Router) { }  
  getTableData(url:string) { 
      return this.httpClient.get<any>(AppComponent.API_URL+url,this.options);
  }  
}
