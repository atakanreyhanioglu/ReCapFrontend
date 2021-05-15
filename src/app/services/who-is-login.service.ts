import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WhoIsLoginService {
  users: User[];
  userName : string;
  userLastname:string;
  user:User;
  constructor(private authService:AuthService,private router:Router,private userService:UserService,
    private localStorageService:LocalStorageService) { }

  getUsers(){
   
    this.userService.getUsers().subscribe(response => {
      this.users = response.data
      this.whoIsLogin();
      
    })
  
}
whoIsLogin(){
  this.users.forEach(user => {
    if(user.email===this.localStorageService.get("email")){
      this.user=user;
    
     return;
      
     
    }
    return ;
  });
}
}
