import { Component, OnInit, VERSION, Inject, ViewChild, HostListener } from '@angular/core'; 
import { Observable, Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { User } from '../_models/model.user';
import { AuthService } from '../_services/auth.service';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { NgxSpinnerService } from 'ngx-spinner';
import { Menu } from './menu/menu.model';
import { RouterConstants } from '../constants/model.RouterConstants';
import { RouterTypes } from '../constants/model.RouterTypes';
import { Settings } from '../app.settings.model';
import { AppSettings } from '../app.settings';
import { UserRoles } from '../constants/userRoles';

@Component({
  selector: 'app-appview',
  templateUrl:'./appview.component.html',
  // styleUrls: ['./appview.component.css'],
  styleUrls: ['./appview.component.scss']
})
export class AppviewComponent implements OnInit { 
  version = VERSION;
  allMenuItems: Menu[] = []; 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  opened = true;
  over = 'side';
  expandHeight = '42px';  
  collapseHeight = '42px';
  displayMode = 'flat'; 
  errorMessage:string;
  // overlap = false;
  currentUser: User = new User();
  header:any='Home';
  user:User = new User();
  watcher: Subscription;
  platform:string='';
  isReg:boolean; 
  
  @ViewChild('sidenav') sidenav:any;
  // @ViewChild('backToTop') backToTop:any;  
   
  public menus = ['vertical', 'horizontal'];
  public menuOption:string;
  public menuTypes = ['default', 'compact', 'mini'];
  public menuTypeOption:string;
  public isStickyMenu:boolean = false;
  public lastScrollTop:number = 0;
  // public showBackToTop:boolean = false;
  public toggleSearchBar:boolean = false;
  private defaultMenu:string; //declared for return default menu when window resized 

  public settings:Settings;
  constructor(private breakpointObserver: BreakpointObserver ,private authService :AuthService,
              public accountService:AccountService, public spinner:NgxSpinnerService,
              private router: Router, @Inject(MediaObserver,) media,
              private http: HttpClient,public appSettings:AppSettings) {
    this.settings = this.appSettings.settings;
    this.currentUser = JSON.parse(sessionStorage.getItem(AuthService.USER_NAME_SESSION_ATTRIBUTE_NAME)); 
    this.platform = localStorage.getItem('platform'); 
  } 

  ngOnInit() { 
    if(window.innerWidth <= 768){
      this.settings.menu = 'vertical';
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    }
    this.menuOption = this.settings.menu; 
    this.menuTypeOption = this.settings.menuType; 
    this.defaultMenu = this.settings.menu; 
    this.getUserDetail(); 
  }  
  getUserDetail(){    
    if(this.currentUser && this.currentUser.role==UserRoles.ROLE_ADMIN){
      this.router.navigate(['/auth/users']);  
      this.isReg=true;
    } 
    if(this.currentUser && this.currentUser.role==UserRoles.ROLE_USER){
      this.router.navigate(['/auth/userHome']);  
      this.isReg=true;
    }  
    if(this.currentUser && this.currentUser.role==UserRoles.ROLE_INSTRUCTOR){
      this.router.navigate(['/auth/userHome']);  
      this.isReg=true;
    } 
  }  
  setHeader(val){
    this.header = val;
   }  
  logOut() {
    sessionStorage.getItem('token')
    sessionStorage.removeItem(AuthService.USER_SESSION_TOKEN)
    sessionStorage.removeItem(AuthService.USER_NAME_SESSION_ATTRIBUTE_NAME)
    this.router.navigate(['/home']); 
  } 
  goHome() { 
    this.getUserDetail();  
  } 
selectedLink: String = ''; 
linkClick(linkId,name){ 
   this.selectedLink = linkId; 
   this.header = name;
   this.router.navigate([linkId]); 
 }
 selectedImage:File = null;
 onSelectFile(event) { 
     if (event.target.files && event.target.files[0]) {
     var reader = new FileReader(); 
     reader.readAsDataURL(event.target.files[0]);
     reader.onload = (event:any) => { 
    if(this.currentUser) 
     this.saveImage();
       }
     }
   } 
   saveImage(){  
    this.accountService.updateUser(this.user)
    .subscribe(
      data => { 
          console.log("POST Request is successful ", data); 
      },
      error => {
          console.log("Error", error);
      }); 
     }  







     
  public chooseMenu(){
    this.settings.menu = this.menuOption; 
    this.defaultMenu = this.menuOption;
    this.router.navigate(['/']); 
  }

  public chooseMenuType(){
    this.settings.menuType = this.menuTypeOption;
  }

  public changeTheme(theme){
    this.settings.theme = theme;   
    this.settings.mainContentBg = theme;       
  }
   
  public toggleSidenav(){
    this.sidenav.toggle();
  }
 
  @HostListener('window:resize')
  public onWindowResize():void {
    if(window.innerWidth <= 768){
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.settings.menu = 'vertical'
    }
    else{
      (this.defaultMenu == 'horizontal') ? this.settings.menu = 'horizontal' : this.settings.menu = 'vertical'
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
    }
  }

  public closeSubMenus(){
    let menu = document.querySelector(".sidenav-menu-outer");
    if(menu){
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i];
        if(child){
          if(child.children[0].classList.contains('expanded')){
              child.children[0].classList.remove('expanded');
              child.children[1].classList.remove('show');
          }
        }
      }
    }
  }
} 
