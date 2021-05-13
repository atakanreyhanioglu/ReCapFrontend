import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SignInModel } from '../models/signInModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:44334/api/auth/"
  constructor(private httpClient:HttpClient) { }

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
}
