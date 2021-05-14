import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from '../models/rental';
import { RentalNormal } from '../models/rentalNormal';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { CarService } from '../services/car.service';
import { RentalService } from '../services/rental.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  @Input() car : Car;
  rentals:RentalNormal[]=[];
  cars:Car[]=[];
  carAvailable:boolean;



 
 
    


  constructor(private rentalService:RentalService, private carService:CarService,
    private toastrService : ToastrService, private authService:AuthService,
    private router: Router,
   ) { }

  ngOnInit(): void {
    this.getRentals()
    
    
  }
 
 
  getRentals(){
    this.rentalService.getNormalRentals().subscribe((response)=>{
      this.rentals=response.data   
      this.rentals.forEach(rental => {
        if(rental.carId==this.car.carId && rental.returnDate ==null){
                return this.carAvailable = false;
        }else{
          return this.carAvailable = true;
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
  
  
}

  
