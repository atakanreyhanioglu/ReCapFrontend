import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { RentalNormal } from 'src/app/models/rentalNormal';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';
import { WhoIsLoginService } from 'src/app/services/who-is-login.service';
import { textSpanIntersectsWithTextSpan } from 'typescript';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  @Input() car : Car;
  rentals:RentalNormal[]=[];
  cars:Car[]=[];
  carAvailable:boolean = true;
  rentDate:Date;
  returnDate:Date;
  message:string
  minDate?: string = '';
  maxDate?: string = '';
  user:User;
  users:User[];
  customers:Customer[];
  customer:Customer;

  totalAmountCar:number
  firstDateSelected: boolean = false;
  carIdForStorage :string;
  totalPrice:string;
  returnDateTime:Date
  customerId:number


  

  title = 'appBootstrap';
  
  closeResult: string;
  state: any;
  constructor(private rentalService:RentalService, private carService:CarService,
    private toastrService : ToastrService, private authService:AuthService,
    private router: Router,private modalService: NgbModal,private datePipe:DatePipe,
   private localStorageService:LocalStorageService,private userService:UserService,
   private customerService:CustomerService,private cartService:CartService) { }

  ngOnInit(): void {
    this.getRentals();
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    this.getUsers();
    
  }
  getRentals(){
    this.rentalService.getNormalRentals().subscribe((response)=>{
      this.rentals=response.data  
      var result = this.rentals.filter(i => i.carId == this.car.carId) 
        result.forEach(element => {
         
              if(
                new Date(element.returnDate).valueOf() > new Date().valueOf()){
                 this.carAvailable =false

              }else{
                this.carAvailable =true
              }
        
        });
   
            


    })
  }
  buttonAvailable(){
    if(this.carAvailable){
      return 'btn btn-success'

    }else{
      return 'btn btn-dark disabled'
    }
    
  }
  isAuthenticated(){
    return this.authService.isAuthenticated()
  }
  
  open(content: any) {
    if(this.isAuthenticated()){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

    }else{
      this.toastrService.info("Please Login!")
    }
    
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

   
   changeState(e:any){
     console.log(e)
     this.state = e
   }

   errorMessage(e:any){
    this.message = e
   }
   getUsers(){
   
    this.authService.getUsers()
    this.getCustomers()
      
    }
    getCustomers(){
      this.customerService.getCustomers().subscribe((response)=>{
          this.customers=response.data
          this.customers.forEach(customer => {
            this.customer=customer
            
          });


      })
    }
  




minDateChange(date: any) {
  this.minDate = date.target.value;
  this.maxDate = this.datePipe.transform(
    new Date(
      new Date(this.minDate).setFullYear(new Date().getFullYear() + 1)
    ),
    'yyyy-MM-dd'
  );
  this.firstDateSelected=true;
}

   totalAmount(){
    let differance = new Date(this.returnDate).getTime() -  new Date(this.rentDate).getTime();
    let price = new Date(differance).getDate();
    this.totalAmountCar = price * this.car.dailyPrice;
    this.totalPrice = (this.totalAmountCar).toString();
    this.localStorageService.add("totalPrice",this.totalPrice)
   
    this.localStorageService.add("customerId",this.customer.id.toString())
    this.localStorageService.add("returnDate",this.returnDate.toString())
    this.localStorageService.add("rentDate",this.rentDate.toString())
    this.localStorageService.add("carId",this.car.carId.toString())



   

  }
  addToCart(car: Car) {
      if( this.firstDateSelected=true){
        this.toastrService.success('Added to cart', car.carName);
        this.cartService.addToCart(car);
         this.carIdForStorage = car.carId.toString()
        this.localStorageService.add("carIdCart",this.carIdForStorage)
        this.router.navigate(['cars/payment'])   
      }
      else{
        this.toastrService.info('Chooase a date..');

      }
     
     
     
  }



}
