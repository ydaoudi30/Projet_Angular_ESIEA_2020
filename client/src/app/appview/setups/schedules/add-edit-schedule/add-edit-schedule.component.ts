import { Component, OnInit, Inject } from '@angular/core';
import { PageBase } from '../../../components/PageBase.component';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../_models/model.user';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../_services/auth.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Schedule } from '../../../../_models/model.shcedule';
import { GeneralService } from '../../../../_services/generalService';
import { Api } from '../../../../constants/api';

@Component({
  selector: 'app-add-edit-schedule',
  templateUrl: './add-edit-schedule.component.html',
  styleUrls: ['./add-edit-schedule.component.css']
})
export class AddEditScheduleComponent extends PageBase implements OnInit {
  form: FormGroup;
  description:string;
  user: User=new User();
  currentSchedule:Schedule = new Schedule();
  errorMessage:string; 
  enterEmail:boolean = false;
  resetPass:boolean = false;
  selectedRole:any;  
  userRoles:any=['ADMIN','INSTRUCTOR']
  constructor(public dialog: MatDialog,public authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super();
      if(data){
        this.currentSchedule = data;
      }
      console.log("this.currentSchedule",this.currentSchedule)
     }

  ngOnInit(): void {  
  }  
  saveClick(): void { 
    this.spinner.show();  
    this.currentSchedule.instructor = this.currentUser; 
    this.generalService.getServiceResult(GeneralService.POST,Api.CREATE_SCHEDULE,this.currentSchedule)
       .subscribe(data=>{  
              this.spinner.hide();
              this.alertService.success('Schedule Added');  
              this.dialog.closeAll(); 
         },err=>{ 
          this.spinner.hide();
         }
       )  
  } 
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.currentSchedule.datetime = event.value;
  }
}
