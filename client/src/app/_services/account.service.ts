import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../_models/model.user";
import { Router } from "@angular/router";
import { AppComponent } from "../app.component";

@Injectable()
export class AccountService {  
  
  users: User[] = [];  
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private httpClient:HttpClient, public router: Router) { } 
  createAccount(user:User){   
    return this.httpClient.post<User>(AppComponent.API_URL+'/account/register',user); 
  } 
  createUser(user:User){  
    return this.httpClient.post<User>(AppComponent.API_URL+'/account/register',user); 
  } 
  getAll() { 
      return this.httpClient.get<User[]>(AppComponent.API_URL+'/account/users',this.options);
  }  
  userDisable(id: number) { 
      return this.httpClient.delete(AppComponent.API_URL+'/account/userDisable/'+id,this.options);
   } 
  deleteUser(id: number) { 
    return this.httpClient.delete(AppComponent.API_URL+'/account/deleteUser/'+id,this.options);
 } 
  userEnable(id: number) {  
    return this.httpClient.delete(AppComponent.API_URL+'/account/userEnable/'+id,this.options);
 } 
  updateUser(user: User) {   
    return this.httpClient.post(AppComponent.API_URL+'/account/update/'+user.userId,user); 
  } 
  getUserById(id: number) {
    return this.httpClient.get<User>(AppComponent.API_URL +'/account/users/' + id,this.options);
  }
  updatePassword(user: User) {   
    return this.httpClient.post<Boolean>(AppComponent.API_URL+'/account/changPass/'+user.userId,user); 
  }   
  resetPasswordByCode(user: User) {   
    return this.httpClient.post<Boolean>(AppComponent.API_URL+'/account/resetPasswordByCode',user); 
  }  
	sendPasswordCode(data:User){  
		return this.httpClient.post(AppComponent.API_URL+'/sendPasswordCode',data); 
  } 
}
