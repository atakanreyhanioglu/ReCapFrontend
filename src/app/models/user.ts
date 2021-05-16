export interface User{
    id:number;
    firstName : string;
    lastName:string;
    email:string
    passwordSalt:string;
    passwordHash:string;
    status:boolean;

}