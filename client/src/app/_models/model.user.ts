import { UserGroups } from "./model.userGroup";
import { Company } from "./model.company";

export class User { 
    userId: number=null;    
	firstName: string=""
	lastName: string="";
    userName: string="";
    fullName: string="";
	email: string="";
	phone: string="";
	role: string="PUBLIC";
    userType: string=""; 
    password: string="";
    confirmPassword: string=""; 
    passwordNew: string=""; 
	created: string="";
    updated: string="";
    imageUrl: string="";
}  