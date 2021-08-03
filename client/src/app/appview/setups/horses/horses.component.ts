import { Component, OnInit } from '@angular/core';
import { PageBase } from '../../components/PageBase.component';
import { User } from '../../../_models/model.user';
import { Api } from '../../../constants/api';
import { AddEditUserComponent } from '../user-groups/add-edit-user/add-edit-user.component';
import { AddEditHorsesComponent } from './add-edit-horses/add-edit-horses.component';
import { Horse } from '../../../_models/model.horse';

@Component({
  selector: 'app-horses',
  templateUrl: './horses.component.html',
  styleUrls: ['./horses.component.css']
})
export class HorsesComponent extends PageBase implements OnInit {
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
  addClick(id = null,pageState = this.PageState.ADD_STATE): void { 
      const dialogRef = this.dialog.open(AddEditHorsesComponent, {
        width: '400px',height:'379px',
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
  getImage(data){  
    if(data != null && data !=''){
      return atob(data);
    } 
  }
}
 