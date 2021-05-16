import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  paymentAddForm:FormGroup;
  cartItems:CartItem[]=[];
  dailyPrice:number;
  car:Car;
  totalPrice:number;
  users:User[];
  user:User;
  checkIfUserFindexPoint :boolean=true;
  
  constructor(private cartService:CartService,private formBuilder:FormBuilder,
    private toastrService:ToastrService,private userService:UserService,
    private localStorageService:LocalStorageService,private carService:CarService,private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.getCart();
    this.getDailyPrice();
    this.getCar();
    this.createPaymentAddForm();
   

  }
  getCar(){

    this.carService.getCarDetailsById( parseInt(this.localStorageService.get("carIdCart"))).subscribe((response)=>{
        this.car=response.data[0]
        this.totalPrice=parseInt(this.localStorageService.get("totalPrice"))        

    })


  }
  getCart(){
    this.cartItems=this.cartService.list();

  }
  getDailyPrice(){
    
   return this.cartService.dailyPrice ;
  
    
  }
  removeFromCart(car:Car){
    this.cartService.removeFromCart(car);
    this.toastrService.error("Deleted from cart",car.carName)
    this.localStorageService.delete("totalPrice")
    this.localStorageService.delete("carIdCart")
    window.location.reload();

  }
  paymentForRent(){
    this.userService.getUsers().subscribe((response)=>{
      this.users=response.data
      this.users.forEach(user => {
        if(user.email==this.localStorageService.get('email') && this.checkIfUserFindexPoint ){
            this.user=user; 
            this.addCardForUser(user)  

        }
      });
    })
      
  }  
  addCardForUser(user:User){

    if(this.paymentAddForm.valid){
      let cardModel = Object.assign({},this.paymentAddForm.value)
        cardModel.userId = user.id
      this.paymentService.add(cardModel)
      this.toastrService.success("Payment Successful.","Well done!")
      
  }
}
  


  
  createPaymentAddForm(){
    this.paymentAddForm= this.formBuilder.group({
      creditCardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      securityCode:["",Validators.required]


    })
  }



}
