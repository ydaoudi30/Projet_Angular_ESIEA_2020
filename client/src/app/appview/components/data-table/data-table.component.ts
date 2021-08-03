import { Component, OnInit, ViewChild, Input,Output,HostListener,EventEmitter, DebugElement} from '@angular/core'; 
import * as $ from 'jquery';   
import { DataGridService } from '../../../_services/data-grid.service';
@Component({
  selector: 'ms-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit{
  tableData:any=[]; 
  @Input() tableProperties:any;
  @Input() actionButtons:any;
  @Output() singleClickData = new EventEmitter<any>();
  @Output() doubleClick = new EventEmitter<any>();
  @Output() actionsMethod = new EventEmitter<any>(); 
  @Output() selectedRecord = new EventEmitter<any>();  
  @Output() nonSelectedRecord = new EventEmitter<any>(); 
  @Output() reloadListRequest = new EventEmitter<any>(); 
  @Output() btnClicked = new EventEmitter<any>();  

  comboboxData=['10/page','25/page','50/page','100/page'];  
  selectedAll: any;   
  filterStr:any = '';
  options:any;
  listActionsId:any;
  detailArea:boolean=false;
  detailWidth:any=0;
  tableWidth:any=100;
  sortOrder:boolean=false;
  selectedPeriod:any = '2'; 
  constructor(private serivce:DataGridService) {
    this.tableProperties={
      sellectAll:true,
      type:true,
      action:true
    }
  }

  ngOnInit(){
  
  }

  @HostListener('click', ['$event'])
  click(event) {
    if(event.target.classList[0] != "action-combobox"){
      var result = $(".popup > .show").removeClass('show');
    }
  } 

  selectAll(){
    if(this.tableData){
      for (var i = 0; i < this.tableData.tbody.length; i++) {
        this.tableData.tbody[i].selected = this.selectedAll;
      }      
      let row:any = this.tableData.tbody.filter( item => item.selected === true);
      this.selectedRecord.emit(row);  

      let nonSelectedRecord:any = this.tableData.tbody.filter( item => item.selected === false);
      this.nonSelectedRecord.emit(nonSelectedRecord);  
    }
    
  }  

  checkIfAllSelected(){  
    let isAnySelected:any = this.tableData.tbody.some(item => item.selected);  
    let row:any = this.tableData.tbody.filter( item => item.selected === true);
    this.selectedRecord.emit(row); 

    let nonSelectedRecord:any = this.tableData.tbody.filter( item => item.selected === false);
    this.nonSelectedRecord.emit(nonSelectedRecord);  
    
    if(isAnySelected){
      this.selectedAll = true;
    } else {
      this.selectedAll = false;
    }        
  } 
  setActionList:any; 
  getClass(value){
    if(value){
      let className=value.replace(/\s/g, "-");
      return className;
    }
  } 
  onSingleClick(id,data) {
    $('.blue').removeClass('blue');
    document.getElementById(id).classList.add("blue");
    this.singleClickData.emit(data);
  } 
  onDoubleClick(data){
    this.doubleClick.emit(data);
  }  
  getElementWidth(value){
    return value+"px";
  } 
  btnClickHandler(btnType:string , data:any){  
    let btnParm:any=[];
    btnParm.data = data;
    btnParm.btnType = btnType;
    this.btnClicked.emit(btnParm)
  } 
  populateTableData(data,count){
    this.tableData=data; 
    if(this.tableProperties.grnList){
      this.tabChangeHandler("2");
    }
  }  
  tabChangeHandler(value){ 
   this.selectedPeriod = value;
   if(this.selectedPeriod == '1'){ 
    this.filterStr = null;
   }else{ 
    this.filterStr = "grnYes";
   } 
  }
}
