import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm : FormGroup;
  brands:Brand[]=[]
  colors:Color[]=[]

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
    private router:Router) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColor();
  }
  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      
      description:["",Validators.required],
      modelYear:["",Validators.required],
      colorId:["",Validators.required],
      brandId:["",Validators.required],
      dailyPrice:["",Validators.required]

  
    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
      console.log(carModel)
      
      this.carService.add(carModel).subscribe(response=>{
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
  backToList(){
    this.router.navigate(["cars/list"])
  }

}
