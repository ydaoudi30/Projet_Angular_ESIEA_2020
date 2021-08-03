import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.sass']
})
export class UserMenuComponent implements OnInit {
 
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
 
  logOut() {
    sessionStorage.getItem('token')
    sessionStorage.removeItem(AuthService.USER_SESSION_TOKEN)
    sessionStorage.removeItem(AuthService.USER_NAME_SESSION_ATTRIBUTE_NAME)
    this.router.navigate(['/home']); 
  } 
}
