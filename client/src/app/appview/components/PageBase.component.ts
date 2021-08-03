import { Component, ViewContainerRef, Input, OnInit, AfterViewInit, OnDestroy } from "@angular/core";  
import { NgxSpinnerService } from "ngx-spinner";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"; 
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'; 
import { MatDialog } from "@angular/material/dialog"; 
import { AuthService } from "../../_services/auth.service";
import { User } from "../../_models/model.user";
import { AccountService } from "../../_services/account.service";
import { Menu } from "../menu/menu.model";
import { RouterTypes } from "../../constants/model.RouterTypes";
import { PageState } from "../../constants/model.PageState";
import { RouterConstants } from "../../constants/model.RouterConstants";
import { DataService } from "../../_services/DataService";
import { GeneralService } from "../../_services/generalService";
import { DataGridService } from "../../_services/data-grid.service";
import { AlertService } from "../../_alert/alert.service";
import { AppInjector } from "../../utils/AppInjector";
import { PageParams } from "../../_models/model.pageParams";
 

@Component({
    selector: 'sp-component-base',
    template: `` 
  })

export class PageBase{ 
    public currentUser: User; 
    public gridData:any=[];
    public tableData:any=[];
    public tableHead:any; 
    public tableProperties:any;  
    public actionButtons:any;
    public selectedAll: any;

    
    public gridData2:any=[];
    public tableData2:any=[];
    public tableHead2:any; 
    public tableProperties2:any;  
    public actionButtons2:any;
    public selectedAll2: any;

    
    public gridData3:any=[];
    public tableData3:any=[];
    public tableHead3:any; 
    public tableProperties3:any;  
    public actionButtons3:any;
    public selectedAll3: any;

    public isHandset$: Observable<boolean>;
    public Tablet$: Observable<boolean>; 
    public breakpoint: number;

    protected dataService:DataService;
    protected generalService:GeneralService;
    protected gridService:DataGridService;
    protected spinner:NgxSpinnerService;  
    protected breakpointObserver: BreakpointObserver;
    protected accountService:AccountService;
    protected authService:AuthService;
    protected alertService:AlertService;
    public pageName:any; 
    public pageState:any; 
    public dialog:MatDialog;
    PageState = PageState;
    public selectedLink:any;  
    uploadRawData:any; 
    uploadBinaryData:any;
    constructor(){
      let injector = AppInjector.getInjector(); 
      if(injector){
        this.dataService = injector.get(DataService);
        this.breakpointObserver = injector.get(BreakpointObserver);
        this.spinner = injector.get(NgxSpinnerService); 
        this.generalService = injector.get(GeneralService); 
        this.gridService = injector.get(DataGridService);
        this.dialog = injector.get(MatDialog);
        this.accountService = injector.get(AccountService);
        this.authService = injector.get(AuthService);
        this.alertService = injector.get(AlertService);
      } 
      this.currentUser = JSON.parse(sessionStorage.getItem(AuthService.USER_NAME_SESSION_ATTRIBUTE_NAME)); 
      this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches)
      ); 
      this.Tablet$ = this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
        map(result => result.matches)
      ); 
      console.log("this.currentUser",this.currentUser)
      console.log("this.Tablet$",this.Tablet$)
      console.log("this.isHandset$",this.isHandset$)
    }



    set spPageParams(params:PageParams) {
    this.dataService.pageParams = params;
    }

    get spPageParams():PageParams {
    let params:PageParams = this.dataService.pageParams;
    return params;
    }
    openPage(menu:Menu){ 
      this.selectedLink = menu.id;  
      let route:any;
      switch(menu.id){
        case RouterTypes.USER_LIST:
             route =  RouterConstants.USER_LIST;
             break;
        case RouterTypes.USER_GROUP_LIST:
            route =  RouterConstants.USER_GROUP_LIST;
            break;
        case RouterTypes.CHANGE_PASSWORD:
              route =  RouterConstants.CHANGE_PASSWORD;
              break;
      }
      this.dataService.navigate(route,menu); 
    }
    
  fileSringToBinary(strData:string):any{
    const byteCharacters = atob(strData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    } 
    return byteNumbers;
  } 
  drawImage(image){
    var myImage = new Image();
    myImage.name = "image.jpg";
    myImage.src = 'data:image/png;base64,'+image; 
    return myImage.src;
  }
}