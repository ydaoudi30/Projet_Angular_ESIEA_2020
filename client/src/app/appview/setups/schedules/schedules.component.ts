import { Component, OnInit } from '@angular/core';
import { AddEditUserComponent } from '../user-groups/add-edit-user/add-edit-user.component';
import { PageBase } from '../../components/PageBase.component';
import { User } from '../../../_models/model.user';
import { Api } from '../../../constants/api';
import { AddEditScheduleComponent } from './add-edit-schedule/add-edit-schedule.component';
import { Schedule } from '../../../_models/model.shcedule';
import { Rides } from '../../../_models/model.rides';
import { Horse } from '../../../_models/model.horse';
import { GeneralService } from '../../../_services/generalService';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent extends PageBase implements OnInit {
  schedules:Schedule[]=[]; 
  horses:Horse[]=[]; 
  breakpoint: number;
  spinner: any;
  gridService: any;
  PageState: any;
  dialog: any;
  accountService: any;
  constructor() {
    super(); 
   }
   ngOnInit() { 
    this.breakpoint = (window.innerWidth <= 400) ? 2 : 6; 
    this.getUsers();
  } 
  getUsers(){   
    this.spinner.show();
    this.gridService.getTableData(Api.GET_ALL_SCHEDULE).subscribe(data => {  
      this.spinner.hide();
      this.schedules = <Schedule[]>data; 
      console.log("this.schedules",this.schedules)
      this.getMyRides();
      },errorCode =>{ 
        this.spinner.hide();
      });
  } 
  getHorses(){   
    this.spinner.show();
    this.gridService.getTableData(Api.GET_ALL_HORSES).subscribe(data => {  
      this.spinner.hide();
      this.horses = <Horse[]>data;  
      },errorCode =>{ 
        this.spinner.hide();
      });
  }
  selectedRecord(data){  
   } 
   reloadListRequest() { 
     this.getUsers();
   } 
   rides:Rides[]=[]; 
  getMyRides(){   
    this.spinner.show();
    this.gridService.getTableData(Api.GET_ALL_RIDES).subscribe(data => {  
      this.spinner.hide();
      this.rides = [];
      let rideList:Rides[] = <Rides[]>data; 
      rideList.forEach(element => {
        if(element.scheduale && element.scheduale.instructor && element.scheduale.instructor.userId === this.currentUser.userId){ 
          this.rides.push(element);
        }
      });
      console.log("this.rides",this.rides) 
      this.getHorses();
      },errorCode =>{ 
        this.spinner.hide();
      });
  }
  addClick(id = null,pageState = this.PageState.ADD_STATE): void { 
      const dialogRef = this.dialog.open(AddEditScheduleComponent, {
        width: '400px',height:'600px',
         data: {id : id }   
      }); 
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.reloadListRequest(); 
      }); 
  } 
  deleteClick(id:number) {
    if(confirm("Are you sure to delete record")) {  
        this.accountService.userDisable(id).subscribe(
        data => {
          this.reloadListRequest();
        },
          error => {
          console.log("Error", error);
        });  
      }  
    }  
  addHorse(ride:Rides,horser){  
    this.spinner.show(); 
    ride.horse = horser.value; 
    this.generalService.getServiceResult(GeneralService.POST,Api.CREATE_RIDE,ride)
       .subscribe(data=>{  
              this.spinner.hide();
              this.reloadListRequest();
         },err=>{ 
          this.spinner.hide();
         }
       )  
  } 
}
 