import { User } from "../_models/model.user";
import { UserGroups } from "../_models/model.userGroup";
 export class PageParams{ 
     public index: number = -1;
     public callback:Function;
     public moduleId: number = -1;
     public sectionName:string; // usedi in security profile breadcrumbs
     public recordName:string;
     public libraryName:string;
     public recordTypeId:number;
     public recordVersion:number;
     public breadcrumbs:any;
     public preloader:any;//BasePreloader;
     public message:string;
     public fileName:string;
     public pageName:string;
     public documentType:number;
     public questionnaireType:number;
     public libraryContainerId:number;
     public openType:string;
     public openTypeId:number;
     public backPageState : number;
     public item:Object;
     public data:Object = new Object(); 
     public pageNameList:any;
     public returnToParent:Boolean;
     public pageId:number;
     public callbackItem:Object;
     public disable:Boolean;
     public isForSearch:Boolean;
     public list:any;
     public isList:Boolean;
     public folder:any;//ISPRecord;
     public folderId:number;
     public folderName:string;
     public productService:number;
     public user:User;
     public userGroup:UserGroups;
     public chevronEvent:Event;
     public distributed:Boolean;
     public hideBreadcrumbs:Boolean;
     public openUpperPage:Boolean;
     public name:String;
     public accessArea:number = -1;     
     public subPageKey:String = "";     
     public callToDiffOperation:Boolean = false; //if you want to perform a different operation in preloader
     public title:String;
     public id:Number;
     public pageState:number;
     public backPageParams:PageParams;
     public backPageName:string;
     public cloneSPParams():PageParams
     {
         return ;//SPPageParams(clone());
     }

     public clone():Object
     {
         var value:any//SPPageParams = super.clone() as SPPageParams;
         value.preloader = null;
         return value;
     }
     public static create(pageName:string = null):PageParams{
        var params:PageParams = new PageParams();
            params.pageName = pageName;
         return params;
     }
     public static createWithId(id:number, name:string=null):PageParams{
        var params:PageParams = new PageParams();
          params.id = id;
          params.name = name;
         return params;
     }
 }