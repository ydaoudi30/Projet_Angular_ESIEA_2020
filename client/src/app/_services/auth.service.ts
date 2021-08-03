import { Injectable } from '@angular/core'; 
import {User} from "../_models/model.user"; 
import {AppComponent} from "../app.component";
import { map } from 'rxjs/operators'; 
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router'; 
import { AppviewComponent } from '../appview/appview.component';
import { Api } from '../constants/api';
@Injectable({ providedIn: 'root' })
export class AuthService { 
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  static USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser' ;
  static USER_SESSION_DETAIL = 'sessionDetail' ;
  static USER_SESSION_TOKEN = 'token';
  tokenSubject: Subject<string> = new Subject();
  uuidSubject: Subject<string> = new Subject();
  constructor(private router: Router,private http: HttpClient) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.user = this.userSubject.asObservable();
  } 
  public get userValue(): User {
      return this.userSubject.value;
  }
//   authenticationService(username: String, password: String) {
//     return this.http.get(AppComponent.API_URL+Api.LOGIN,
//       { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => { 
//        sessionStorage.setItem(AuthService.USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(res['principal'])) 
//        sessionStorage.setItem(AuthService.USER_SESSION_DETAIL, JSON.stringify(res['details']))
//       }));
//   }
//   createBasicAuthToken(username: String, password: String) {
//     return 'Basic ' + window.btoa(username + ":" + password)
//   }
  login(user: User): Observable<any> {
    const url = AppComponent.API_URL+Api.LOGIN;
    return this.http.post(url, user);
  } 
//   login(user:User) {
//       return  this.authenticationService(user.username,user.password); 
//   } 
  getUser() {
    const url = AppComponent.API_URL+Api.ME; 
    return this.http.get(url, {});
  }
  logout() { 
     sessionStorage.removeItem(AuthService.USER_NAME_SESSION_ATTRIBUTE_NAME); 
     this.userSubject.next(null);
     this.router.navigate(['/account/login']);
  } 
  register(registerUser: User): Observable<any> {
    const url = AppComponent.API_URL+Api.REGISTER;
    return this.http.post(url, registerUser);
  }
//   register(user: User) {
//       return this.http.post(AppComponent.API_URL+Api.REGISTER, user);
//   } 
  getAll() {
      return this.http.get<User[]>(AppComponent.API_URL);
  } 
  getById(id: string) {
      return this.http.get<User>(AppComponent.API_URL);
  } 
  update(id, params) {
      return this.http.put(AppComponent.API_URL, params)
          .pipe(map(x => {
              // update stored user if the logged in user updated their own record
              if (id == this.userValue.userId) {
                  // update local storage
                  const user = { ...this.userValue, ...params };
                  localStorage.setItem('user', JSON.stringify(user));

                  // publish updated user to subscribers
                  this.userSubject.next(user);
              }
              return x;
          }));
  } 
  delete(id: any) {
      return this.http.delete(AppComponent.API_URL)
          .pipe(map(x => {
              // auto logout if the logged in user deleted their own record
              if (id == this.userValue.userId) {
                  this.logout();
              }
              return x;
          }));
  }
}