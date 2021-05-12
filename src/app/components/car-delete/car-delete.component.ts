import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarNormal } from 'src/app/models/carNormal';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {
 car:CarNormal;
 id:number;
 dailyPrice:number;
 modelYear:string;
 carName:string;
 brand:Brand;
 brandName:string;
 color:Color;
 colorName:string;
 brandId:number;
 colorId:number;

 
  constructor(private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
      if(params["carId"]){
        this.getByCarId(params["carId"])
    
      
      }
    })
  }
  getByCarId(carId:number){
    this.carService.getCarById(this.activatedRoute.snapshot.params["carId"]).subscribe(response=>{
      this.car = response.data
      this.id=this.car.id
      this.dailyPrice=this.car.dailyPrice
      this.modelYear=this.car.modelYear
      this.carName=this.car.description
      this.brandId=this.car.brandId
      this.colorId=this.car.colorId
      this.getByBrandId(this.brandId );
      this.getByColorId(this.colorId)
      
    })
  }
 getByBrandId(brandId :number){
   this.brandService.getByBrandId(brandId).subscribe(response=>{
     this.brand = response.data
     this.brandName=this.brand.brandName
   })

 }  
 getByColorId(colorId :number){
  this.colorService.getByColorId(colorId).subscribe(response=>{
    this.color = response.data
    this.colorName=this.color.colorName
  })

} 


  
  delete(){
    if (this.car) {
      this.carService.delete(this.car).subscribe(response=>{
        this.toastrService.success(response.message,"Good Job!")
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
    this.router.navigate(["cars/list"]);
  }

}
