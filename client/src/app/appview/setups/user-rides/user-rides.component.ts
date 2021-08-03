import { Component, OnInit } from '@angular/core';
import { PageBase } from '../../components/PageBase.component';
import { User } from '../../../_models/model.user';
import { Api } from '../../../constants/api';
import { AddEditUserComponent } from '../user-groups/add-edit-user/add-edit-user.component';
import { Rides } from '../../../_models/model.rides';
import { Schedule } from '../../../_models/model.shcedule';
import { AddEditScheduleComponent } from '../schedules/add-edit-schedule/add-edit-schedule.component';
import { GeneralService } from '../../../_services/generalService';

@Component({
  selector: 'app-user-rides',
  templateUrl: './user-rides.component.html',
  styleUrls: ['./user-rides.component.css']
})
export class UserRidesComponent extends PageBase implements OnInit {
  schedules:Schedule[]=[]; 
  rides:Rides[]=[]; 
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
  reloadListRequest() { 
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
  getMyRides(){   
    this.spinner.show();
    this.gridService.getTableData(Api.GET_ALL_RIDES).subscribe(data => {  
      this.spinner.hide();
      this.rides = [];
      let rideList:Rides[] = <Rides[]>data; 
      rideList.forEach(element => {
        if(element.rider && element.rider && element.rider.userId === this.currentUser.userId){ 
          this.rides.push(element);
        }
      });
      console.log("this.schedules",this.rides) 
      },errorCode =>{ 
        this.spinner.hide();
      });
  }
  selectedRecord(data){  
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
  ride:Rides = new Rides();
  getRide(schedule){ 
    this.ride = new Rides();
    this.spinner.show();  
    this.ride.rider = this.currentUser; 
    this.ride.scheduale = schedule; 
    this.generalService.getServiceResult(GeneralService.POST,Api.CREATE_RIDE,this.ride)
       .subscribe(data=>{  
              this.spinner.hide();
              this.reloadListRequest();
         },err=>{ 
          this.spinner.hide();
         }
       )  
  } 
}
 