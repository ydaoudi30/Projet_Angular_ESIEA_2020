import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

constructor(private router: Router,
            public dialog: MatDialog,) {

}

ngOnInit(): void {
} 
goHome() { 
  this.router.navigate(['home']);  
} 
login(): void {
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
}
registration(){
  const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '550px';
        dialogConfig.width = '400px';
       // dialogConfig.data = {name: this.name, animal: this.animal}  // to sent data to dialog
  const dialogRef = this.dialog.open(RegistrationComponent ,dialogConfig); 
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed'); 
  });
}
}
