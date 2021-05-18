import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { Payment } from 'src/app/models/payment';
import { ResponseModel } from 'src/app/models/responseModel';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
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
  cards:Payment[]
  
  constructor(private cartService:CartService,private formBuilder:FormBuilder,
    private toastrService:ToastrService,private userService:UserService,
    private localStorageService:LocalStorageService,private carService:CarService,
    private datePipe:DatePipe,private paymentService:PaymentService,
    private router:Router,private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getCart();
    this.getDailyPrice();
    this.getCar();
    this.createPaymentAddForm();
    this.getCards();
   

  }
  getCards(){
    this.paymentService.getPayments().subscribe((response)=>{
      
       this.cards = response.data.filter(p=>p.userId==parseInt(this.localStorageService.get("userId")))
     
    })
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
    this.localStorageService.delete("customerId")
    this.localStorageService.delete("returnDate")
    this.localStorageService.delete("rentDate")
    this.localStorageService.delete("carId")
    window.location.reload();

  }
  paymentForRent(){
    this.userService.getUsers().subscribe((response)=>{
      this.users=response.data
      this.users.forEach(user => {
        if(user.email==this.localStorageService.get('email') && this.checkIfUserFindexPoint ){
            this.user=user; 
            if(this.cards.length>0){
              //kart sistemde kayıtlı ise işlemleri buraya yaz

              return;
            }else{
              
              this.addCardForUser(user)  

            }
            

        }
      });
    })
      
  }  
  createPaymentAddForm(){
    this.paymentAddForm= this.formBuilder.group({
      creditCardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      securityCode:["",Validators.required]


    })
  }

 
  addCardForUser(user:User){
    if(this.paymentAddForm.valid){
      let cardModel = Object.assign({},this.paymentAddForm.value)
        cardModel.userId = user.id
      this.paymentService.add(cardModel).subscribe((response)=>{
        this.toastrService.success("Payment Successful.","Well done!")
        this.AddRental();
        this.router.navigate(["cars"])
        this.localStorageService.delete("userId")
        this.localStorageService.delete("customerId")
        this.localStorageService.delete("returnDate")
        this.localStorageService.delete("rentDate")
        this.localStorageService.delete("carId")
        this.localStorageService.delete("carIdCart")

      },responseError=>{
      if(responseError.error.Errors.length>0){
        for (let i = 0; i <responseError.error.Errors.length; i++) {
                 this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error!")
                 console.log(responseError.error.Errors[i].ErrorMessage);
                 
      }
    }})
      
  }else{
    this.toastrService.error("Invalid form information.","Sorry.")
  }
}
AddRental(){
   let rentalModel = Object.assign({})
    rentalModel.carId =   parseInt(this.localStorageService.get("carId"))

     rentalModel.rentDate =   this.datePipe.transform(
      new Date(
        new Date(this.localStorageService.get("rentDate")).setFullYear(
          new Date().getFullYear() + 1)),'yyyy-MM-dd')
    rentalModel.returnDate =  this.datePipe.transform(
      new Date(
        new Date(this.localStorageService.get("returnDate")).setFullYear(
          new Date().getFullYear() + 1)),'yyyy-MM-dd')


    rentalModel.userId= parseInt(this.localStorageService.get("userId"))
    rentalModel.customerId =   parseInt(this.localStorageService.get("customerId"))

    this.rentalService.addRental(rentalModel).subscribe();

  }

  


  
  



}
