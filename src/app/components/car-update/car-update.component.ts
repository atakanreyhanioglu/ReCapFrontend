import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarNormal } from 'src/app/models/carNormal';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm : FormGroup;
  brands:Brand[]=[]
  colors:Color[]=[]
  car:CarNormal;
  id:number;
  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.getByCarId(params["carId"])
    })
    this.createCarUpdateForm();
    this.getBrands();
    this.getColor();
    
  }
  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      description:["",Validators.required],
      modelYear:["",Validators.required],
      colorId:["",Validators.required],
      brandId:["",Validators.required],
      dailyPrice:["",Validators.required]

  
    })
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value)
      console.log(carModel)

      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Good Job!")
        this.backToList();
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
                   this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error!")
                   console.log(responseError.error.Errors[i].ErrorMessage);
                   
        }
      }
    })
      
    }else{
      this.toastrService.error("Invalid form information.","Sorry.")
    }
    
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }


  getColor(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
  getByCarId(carId:number){
    this.carService.getCarById(this.activatedRoute.snapshot.params["carId"]).subscribe(response=>{
      this.car = response.data
      this.id=this.car.id
      console.log(this.car)
    
      
    })
  }
  backToList(){
    this.router.navigate(["cars/list"])
  }

}
