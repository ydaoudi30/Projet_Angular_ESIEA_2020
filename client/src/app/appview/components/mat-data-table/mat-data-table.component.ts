import {AfterViewInit, Component, ViewChild, EventEmitter, Output, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'; 

@Component({
  selector: 'app-mat-data-table',
  templateUrl: './mat-data-table.component.html',
  styleUrls: ['./mat-data-table.component.css']
})
export class MatDataTableComponent implements AfterViewInit {  
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
  selectedAll: any; 
  listActionsId:any; 
  displayedColumns:any;
  columns:any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() {
    this.tableProperties={
      sellectAll:true,
      type:true,
      action:true
    } 
  }
  populateTableData(data){
    this.tableData=data;
    this.columns = this.tableData.thead;
    this.displayedColumns = this.columns.map(c => c.key); 
    this.dataSource = new MatTableDataSource(this.tableData.list); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 
  ngAfterViewInit() {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 
  selectedRowIndex = -1;

  highlight(row){
    this.selectedRowIndex = row.id;
  }
} 