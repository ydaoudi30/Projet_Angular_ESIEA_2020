import { Component, OnInit ,Input,ViewChild, Output, EventEmitter} from '@angular/core'; 
import {Router} from "@angular/router";  
import { Menu } from '../../menu/menu.model';
import { PageBase } from '../PageBase.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent extends PageBase implements OnInit { 
  @Input() items: Menu[]; 
  @Output() header:EventEmitter<any> = new EventEmitter();
  @Input() platform: string; 
  @ViewChild('childMenu') public childMenu; 
  constructor(private router: Router) {
    super();  
  } 
  ngOnInit() {  
  }  
  linkClick(menu:Menu){ 
   this.header.emit(menu.title);
   this.openPage(menu); 
   }
} 
