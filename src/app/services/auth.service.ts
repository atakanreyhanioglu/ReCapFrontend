import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SignInModel } from '../models/signInModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:44334/api/auth/"
  constructor(private httpClient:HttpClient,private userService:UserService,private localStorageService:LocalStorageService) { }


  users:User[];
  userId : number

  login(loginModel:LoginModel){
      return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }
  signIn(signInModel:SignInModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",signInModel)
}
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
  getUsers(){
   
    this.userService.getUsers().subscribe(response => {
      this.users = response.data
      this.whoIsLogin();
      
    })
  
}
whoIsLogin(){
  this.users.forEach(user => {
    if(user.email===this.localStorageService.get("email")){
       this.userId=user.id;
     return;
      
     
    }
    return ;
  });
}
}
