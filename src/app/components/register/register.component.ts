import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signInForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService
    , private authService:AuthService,private router:Router,private userService:UserService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createSignInForm();
  }
  createSignInForm(){
    this.signInForm=this.formBuilder.group({
        firstName :["",Validators.required],
        lastName :["",Validators.required],
        email:["",Validators.required],
        password:["",Validators.required]


    })
}
signIn(){
  
  if(this.signInForm.valid){
    console.log(this.signInForm.value)
    let signInModel = Object.assign({},this.signInForm.value)
    
    this.authService.signIn(signInModel).subscribe(response=>{
      this.toastrService.success(response.message,"SignInSuccessful!")
      this.localStorageService.add("token",response.data.token)
      window.location.reload();
      
      

    },responseError=>{
     // console.log(responseError)
     this.toastrService.error(responseError.error);
     
    })
  }
}
}
