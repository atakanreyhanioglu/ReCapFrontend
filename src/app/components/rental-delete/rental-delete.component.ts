import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalNormal } from 'src/app/models/rentalNormal';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-delete',
  templateUrl: './rental-delete.component.html',
  styleUrls: ['./rental-delete.component.css']
})
export class RentalDeleteComponent implements OnInit {
   
  rentals:Rental[];
  carId:number
  customerName:string
  customerLastName:string
  carName:string
  rentDate:Date
  returnDate:Date
  constructor(private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getRentalbyCarId();
     
    
  }
  getRentalbyCarId(){
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data.filter(r=>r.carId==this.activatedRoute.snapshot.params["carId"])


    })


  }
 

  delete(){
    let rentalForDelete:RentalNormal = Object.assign({})
    rentalForDelete.id=this.rentals.find(r=>r.carId==this.activatedRoute.snapshot.params["carId"]).id
    rentalForDelete.carId=parseInt(this.activatedRoute.snapshot.params["carId"])
    rentalForDelete.userId=parseInt(this.localStorageService.get("userId"))
    rentalForDelete.customerId=this.rentals.find(r=>r.carId==this.activatedRoute.snapshot.params["carId"]).customerId
    rentalForDelete.rentDate=this.rentals.find(r=>r.carId==this.activatedRoute.snapshot.params["carId"]).rentDate
    rentalForDelete.returnDate=this.rentals.find(r=>r.carId==this.activatedRoute.snapshot.params["carId"]).returnDate
    console.log(rentalForDelete)

    if (rentalForDelete) {
      this.rentalService.deleteRental(rentalForDelete).subscribe(response=>{
        this.toastrService.success("Rental Deleted.","Good Job!")
        this.backToList();
      }
      ,
      (responseError)=>
      {
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error!")
          }
        }
      }
      );
    } else {
      this.toastrService.error("Invalid form information.","Sorry.")
    }
  }
  backToList(){
    this.router.navigate(["rentals/list"]);
  }

}
