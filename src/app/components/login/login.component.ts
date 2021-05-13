import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  email:string;

  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService
    , private authService:AuthService,private router:Router,private userService:UserService,
    private localStorageService:LocalStorageService) { }

    
  ngOnInit(): void {
    this.createLoginForm();
  }



  createLoginForm(){
      this.loginForm=this.formBuilder.group({
          email:["",Validators.required],
          password:["",Validators.required]


      })
  }
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      let loginModel = Object.assign({},this.loginForm.value)
    
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success(response.message,"Login Successful!")
        this.localStorageService.add("token",response.data.token)
        this.localStorageService.add("email",this.loginForm.value.email)
        window.location.reload();
        
       
      },responseError=>{
       // console.log(responseError)
       this.toastrService.error(responseError.error,"Please Register!");
       
      })
    }
  }
 

}
