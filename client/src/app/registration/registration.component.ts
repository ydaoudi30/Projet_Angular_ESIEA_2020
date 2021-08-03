import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { FormGroup } from '@angular/forms';
import { User } from '../_models/model.user';
import { RegistrationCntComponent } from '../registration-cnt/registration-cnt.component'; 
import { PageBase } from '../appview/components/PageBase.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent extends PageBase implements OnInit { 
  form: FormGroup;
  description:string;
  user: User=new User();
  currentUser:User = new User();
  errorMessage:string; 
  enterEmail:boolean = false;
  resetPass:boolean = false; 
  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { 
    // this.spinner.show(); 
    // setTimeout(() => { 
    //   this.spinner.hide();
    // }, 1000);
  } 
  login(): void {
    this.spinner.show();
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = false;
          dialogConfig.autoFocus = true;
          dialogConfig.height = '550px';
          dialogConfig.width = '400px';
         // dialogConfig.data = {name: this.name, animal: this.animal}  // to sent data to dialog
    const dialogRef = this.dialog.open(LoginComponent ,dialogConfig); 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'); 
    }); 
    this.spinner.hide();
  } 
  regContinue(): void {
    this.spinner.show();
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = false;
          dialogConfig.autoFocus = true;
          dialogConfig.height = '550px';
          dialogConfig.width = '400px';
          dialogConfig.data =this.user  // to sent data to dialog
    const dialogRef = this.dialog.open(RegistrationCntComponent ,dialogConfig); 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'); 
    });
    this.spinner.hide();
  }
  registrationWithFb(){
    alert("will implement soon")
  }
  registrationWithGoogle(){
    alert("will implement soon")
  }
}
