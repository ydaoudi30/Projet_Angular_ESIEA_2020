import { Component, OnInit, Inject } from '@angular/core';
import { PageBase } from '../../../components/PageBase.component';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../_models/model.user';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../_services/auth.service';
import { Horse } from '../../../../_models/model.horse';
import { GeneralService } from '../../../../_services/generalService';
import { Api } from '../../../../constants/api';

@Component({
  selector: 'app-add-edit-horses',
  templateUrl: './add-edit-horses.component.html',
  styleUrls: ['./add-edit-horses.component.css']
})
export class AddEditHorsesComponent extends PageBase implements OnInit {
  form: FormGroup;
  description:string; 
  currentHorse:Horse = new Horse();
  errorMessage:string; 
  enterEmail:boolean = false;
  resetPass:boolean = false;
  selectedRole:any;  
  userRoles:any=['ADMIN','INSTRUCTOR']
  constructor(public dialog: MatDialog,public authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super();
      if(data){
        this.currentHorse = data;
      }
      console.log("this.currentHorse",this.currentHorse)
     }

  ngOnInit(): void {  
  } 
  saveClick(): void { 
    this.spinner.show();   
    this.generalService.getServiceResult(GeneralService.POST,Api.CREATE_HORSE,this.currentHorse)
       .subscribe(data=>{  
              this.spinner.hide();
              this.alertService.success('User Added');  
              this.dialog.closeAll(); 
         },err=>{ 
          this.spinner.hide();
         }
       )  
  } 
  selectedfileName:any
  browseFile(event: { target: { files: any[]; }; }){ 
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();  
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (event:any) => {  
        this.selectedfileName = event.target.result; 
        this.uploadRawData = event.target.result; 
        let filestring = btoa( this.uploadRawData );
        this.uploadBinaryData = this.fileSringToBinary(filestring);
        this.currentHorse.image = this.uploadBinaryData;
      };  
     } 
   }
}
