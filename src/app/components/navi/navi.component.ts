import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  cartItems:CartItem[]=[]
  isLogin :boolean;
  users: User[]=[];
  userName : string;
  userLastname:string;
  carId:number
  checkIfCartFull:boolean =false
  constructor(private cartService:CartService,private userService:UserService,
    private localStorageService:LocalStorageService,private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.getPaymentButton();
    this.checkIfLogin();
    this.getUsers();
    this.checkCart();
    
   
    
  }
  checkCart(){
     
        
        if(this.localStorageService.get('carIdCart')){
          return this.checkIfCartFull=true;
           ;
        }else{
          return  this.checkIfCartFull=false;
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
         this.userName=user.firstName;
         this.userLastname = user.lastName
       return;
        
       
      }
      return ;
    });
  }
 

  getPaymentButton(){
        this.cartItems = this.cartService.list();
  }
  checkIfLogin(){
    if(this.localStorageService.get("token")){
       this.isLogin = true
       return;
    }else{
       this.isLogin = false
       return;

    }
  }
  logout(){
    this.localStorageService.delete("token");
    this.localStorageService.delete("email");
    this.localStorageService.delete("totalPrice");
    this.localStorageService.delete("carIdCart");
    this.localStorageService.delete("userId")
    this.localStorageService.delete("customerId")
    this.localStorageService.delete("returnDate")
    this.localStorageService.delete("rentDate")
    this.localStorageService.delete("carId")
    this.toastrService.success("Logout Successful.","See you next time !")
    window.location.reload();
    }
  

}
