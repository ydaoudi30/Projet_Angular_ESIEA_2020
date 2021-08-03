import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { FormGroup } from '@angular/forms';
import { User } from '../_models/model.user';
import { AuthService } from '../_services/auth.service'; 
import { PageBase } from '../appview/components/PageBase.component';

@Component({
  selector: 'app-registration-cnt',
  templateUrl: './registration-cnt.component.html',
  styleUrls: ['./registration-cnt.component.css']
})
export class RegistrationCntComponent extends PageBase implements OnInit {
 
  form: FormGroup;
  description:string;
  user: User=new User();
  currentUser:User = new User();
  errorMessage:string; 
  enterEmail:boolean = false;
  resetPass:boolean = false; 
  constructor(public dialog: MatDialog,public authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super();
      this.currentUser = data;
      console.log("this.currentUser",this.currentUser)
     }

  ngOnInit(): void { 
    this.spinner.show(); 
    setTimeout(() => { 
      this.spinner.hide();
    }, 1000);
  } 
  login(): void {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = false;
          dialogConfig.autoFocus = true;
          dialogConfig.height = '550px';
          dialogConfig.width = '400px';
         // dialogConfig.data = {name: this.name, animal: this.animal}  // to sent data to dialog
    const dialogRef = this.dialog.open(LoginComponent ,dialogConfig); 
    dialogRef.afterClosed().subscribe(result => { 
    });
  } 
  register() {
    this.spinner.show(); 
    this.currentUser.confirmPassword = this.currentUser.password;
    this.authService.register(this.currentUser).subscribe(
        res => { 
            this.spinner.hide();
            this.dialog.closeAll();
            this.alertService.success('注册成功'); 
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.height = '550px';
            dialogConfig.width = '400px';
            dialogConfig.data = {user: this.user}  // to sent data to dialog
            const dialogRef = this.dialog.open(LoginComponent ,dialogConfig); 
            dialogRef.afterClosed().subscribe(result => { 
            }); 
        },
        (error) => {
            this.alertService.warn('Invalid parameters');
        }
    );
  }
  regContinue(): void { 
    this.spinner.show(); 
    sessionStorage.removeItem(AuthService.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.currentUser.role = "1";
    this.authService.register(this.currentUser)
       .subscribe(data=>{  
              this.spinner.hide();
              this.dialog.closeAll();
              const dialogConfig = new MatDialogConfig();
                    dialogConfig.disableClose = false;
                    dialogConfig.autoFocus = true;
                    dialogConfig.height = '550px';
                    dialogConfig.width = '400px';
                    dialogConfig.data = {user: this.user}  // to sent data to dialog
              const dialogRef = this.dialog.open(LoginComponent ,dialogConfig); 
              dialogRef.afterClosed().subscribe(result => { 
              }); 
         },err=>{ 
          this.spinner.hide();
         }
       )  
  } 
}
