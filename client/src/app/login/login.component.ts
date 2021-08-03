  import { Component, OnInit, Inject } from '@angular/core';
  import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { User } from '../_models/model.user';
  import { AuthService } from '../_services/auth.service';
  import { AccountService } from '../_services/account.service';
  import { Router } from '@angular/router'; 
  import { LoginToken } from '../_models/login-token';
  import { PageBase } from '../appview/components/PageBase.component';

  @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  })
  export class LoginComponent extends PageBase implements OnInit {
    form: FormGroup;
    description:string;
    user: User=new User(); 
    errorMessage:string; 
    enterEmail:boolean = false;
    resetPass:boolean = false; 
    constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<LoginComponent>,public router: Router) {
    super();
    } 
    ngOnInit() {  
    }
    close() {
    this.dialogRef.close();
    }  
    login() {
      this.spinner.show();
      this.authService.login(this.user).subscribe((res: LoginToken) => {
        this.spinner.hide();
        this.authService.tokenSubject.next(res.token); 
        sessionStorage.setItem('token', res.token);
        this.getUser(); 
        },
      (error) => {
        this.spinner.hide();
        this.alertService.warn('Invalid login');
      });
    }
    getUser() {
      this.spinner.show(); 
      this.authService.getUser().subscribe((res: any) => {
      this.spinner.hide();  
      sessionStorage.setItem(AuthService.USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(res)) 
      this.router.navigate(['/auth']);  
      this.dialog.closeAll();
      }, (error) => {
        this.spinner.hide();  
      });
    } 
    forgetPassword(){
      this.enterEmail = true;
      this.resetPass = false;
    }
    resetPasssword(){ 
      if(this.user.confirmPassword != this.user.passwordNew){
        alert("password mismatched ! Please try again")
        this.user.passwordNew ="";
        this.user.confirmPassword = "";
        return;
      }
      if(this.user.confirmPassword ==null || this.user.passwordNew ==null){
        alert("password not entered ! Please try again")  
        return;
      }
      this.accountService.resetPasswordByCode(this.user)
      .subscribe(
        data => { 
            console.log("POST Request is successful ", data);
            if(data){
              localStorage.removeItem('currentUser');
              this.router.navigate(['login']); 
              alert("Password changed Successfully");
              this.enterEmail = false;
              this.resetPass = false; 
            }else{
              alert("You have Entered wrong Code");
            } 
        },
        error => {
            console.log("Error", error);
        });
    }
    sendPasswordCode(data){  
    this.resetPass = true;
    this.accountService.sendPasswordCode(this.user)
    .subscribe(data=>{  
      this.user = null; 
      },err=>{
      this.errorMessage="Sorry :  Username or password is incorrect";
      });
    }

  }