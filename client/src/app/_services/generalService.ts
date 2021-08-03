import { Injectable } from '@angular/core'; 
import {AppComponent} from "../app.component"; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Router} from "@angular/router"; 

@Injectable({
  providedIn: 'root'
})  
export class GeneralService { 
  static POST = "post";   
  static GET = "get";   
  static DELETE = "delete";  
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json')};
  constructor(private httpClient:HttpClient, public router: Router) { } 
  getServiceResult(type, url,data){
    if(type == GeneralService.POST){
      return this.httpClient.post<any>(AppComponent.API_URL+url,data); 
    }else if(type == GeneralService.GET){
      return this.httpClient.get<any>(AppComponent.API_URL+url,this.options);
    }else if(type == GeneralService.DELETE){
      return this.httpClient.delete(AppComponent.API_URL+url+data,this.options);
    }
  } 
}
