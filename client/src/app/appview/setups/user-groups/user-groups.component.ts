import { Component, OnInit, ViewChild } from '@angular/core'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { User } from '../../../_models/model.user'; 
import { MatDialog } from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { UserGroups } from '../../../_models/model.userGroup';
import { PageBase } from '../../components/PageBase.component';
import { MatDataTableComponent } from '../../components/mat-data-table/mat-data-table.component';
import { Api } from '../../../constants/api';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent extends PageBase implements OnInit {
  users:User[]=[]; 
  constructor() {
    super(); 
   }
   ngOnInit() { 
    this.breakpoint = (window.innerWidth <= 400) ? 2 : 6; 
    this.getUsers();
  } 
  getUsers(){   
    this.spinner.show();
    this.gridService.getTableData(Api.GET_ALL_USERS).subscribe(data => {  
      this.spinner.hide();
      this.users = <User[]>data; 
      console.log("this.users",this.users)
      },errorCode =>{ 
        this.spinner.hide();
      });
  }
  selectedRecord(data){  
   } 
   reloadListRequest() { 
     this.getUsers();
   } 
  btnClicked(btnEvent){  
    let data = btnEvent.data;
    let btnType = btnEvent.btnType;
    if(btnType=='add'){
      this.addClick();
    }
    if(btnType=='edit'){
      this.addClick(data.id,this.PageState.EDIT_STATE)
    }
    if(btnType=='delete'){
      this.deleteClick(data.id)
    }
    if(btnType=='view'){
      this.addClick(data.id,this.PageState.VIEW_STATE)
    } 
  }
  addClick(id = null,pageState = this.PageState.ADD_STATE): void { 
      const dialogRef = this.dialog.open(AddEditUserComponent, {
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
}
 