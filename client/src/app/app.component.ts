import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from './app.settings.model';
import { AppSettings } from './app.settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd'; 
  deviceInfo = null;
  platform:string;
  environment:any[]=[]; 
  static API_URL="";   
  public settings: Settings;
  constructor(private httpService: HttpClient,
              private deviceService: DeviceDetectorService,
              public appSettings:AppSettings) {
    this.settings = this.appSettings.settings;
    this.epicFunction();  
   }
   ngOnInit(){
   }  
    epicFunction() {
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      if(isMobile){
        this.platform="mobile";
      } 
      if(isTablet){
        this.platform="mobile"; 
      } 
      if(isDesktopDevice){
        this.platform="desktop";  ``
      } 
      localStorage.setItem('platform', this.platform); 
      this.httpService.get('./assets/environment.json').subscribe(
        data => {
          this.environment = data as Object[]; 
          AppComponent.API_URL = this.environment[0].API_URL;
          console.log("server Url",AppComponent.API_URL);   
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        });
    } 
}
