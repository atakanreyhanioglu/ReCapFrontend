import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  user : User;
  userUpdateForm : FormGroup;
  users :User[];
  constructor(private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getUsers();
    this.createUserForm();
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
       this.user = user
     return;

    }
    return ;
  });
}
createUserForm(){
  this.userUpdateForm = this.formBuilder.group({
    firstName : ["",Validators.required],
    lastName: ["",Validators.required]
  })
}
update(){
  if(this.userUpdateForm.valid){
    let userModel = Object.assign({},this.userUpdateForm.value)
    userModel.id = this.user.id
    userModel.passwordSalt=this.user.passwordSalt
    userModel.passwordHash=this.user.passwordHash
    userModel.status=this.user.status
    userModel.email=this.user.email
     this.userService.update(userModel).subscribe(response =>{
       this.toastrService.success(response.message,"Good Job!")
       window.location.reload();
     }
     , (responseError)=>
     {
       if(responseError.error.Errors.length>0){
         for (let i = 0; i < responseError.error.Errors.length; i++) {
           this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error!")
         }
       }

     }
     );
   

  }
  
  else{
    this.toastrService.error("Invalid form information.","Sorry.")
  }
}
}
