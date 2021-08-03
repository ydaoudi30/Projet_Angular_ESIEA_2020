import { Component, OnInit, Inject } from '@angular/core';
import { PageBase } from '../../../components/PageBase.component';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../_models/model.user';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../../../../login/login.component';
import { AuthService } from '../../../../_services/auth.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent extends PageBase implements OnInit {
  form: FormGroup;
  description:string;
  user: User=new User();
  currentUser:User = new User();
  errorMessage:string; 
  enterEmail:boolean = false;
  resetPass:boolean = false;
  selectedRole:any;  
  userRoles:any=['ADMIN','INSTRUCTOR']
  constructor(public dialog: MatDialog,public authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super();
      if(data){
        this.currentUser = data;
      }
      console.log("this.currentUser",this.currentUser)
     }

  ngOnInit(): void {  
  } 
  regContinue(): void { 
    this.spinner.show(); 
    this.currentUser.role = this.selectedRole;
    sessionStorage.removeItem(AuthService.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.authService.register(this.currentUser)
       .subscribe(data=>{  
              this.spinner.hide();
              this.alertService.success('User Added');  
              this.dialog.closeAll(); 
         },err=>{ 
          this.spinner.hide();
         }
       )  
  } 
}
