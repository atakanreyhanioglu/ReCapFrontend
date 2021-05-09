import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm : FormGroup;
  colorAddForm : FormGroup;
  brands:Brand[]=[];
  colors:Color[]=[];
  carAddForm:FormGroup;


  constructor(private activatedRoute:ActivatedRoute,private carService:CarService, private brandService:BrandService, private colorService:ColorService,
    private formBuilder:FormBuilder ,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
    this.createColorAddForm();
    this.getAllBrands();
    this.getAllColors();
    this.createCarAddForm();

  }
  getAllBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      
    });
  }
  getAllColors(){
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      
    });
  }
  
  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
     brandId : ["",Validators.required],
     colorId : ["",Validators.required],
     modelYear : ["",Validators.required],
     dailyPrice :["",Validators.required],
     description : ["",Validators.required]
    })
 }
  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName : ["",Validators.required]
    })
  }
  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName : ["",Validators.required]
    })
  }
  
  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response => {
        this.toastrService.success(response.message,"Good Job!")
      },responseError => {
        if(responseError.error.Errors.length > 0){
          for(let i =0; i<responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error!");
          } }
        });
      }else{
        this.toastrService.error("Invalid form information.","Sorry.");
      }
    }
   
    addColor(){
      if(this.colorAddForm.valid){
        let colorModel = Object.assign({},this.colorAddForm.value)
        this.colorService.add(colorModel).subscribe(response => {
          this.toastrService.success(response.message,"Good Job!")
        },responseError => {
          if(responseError.error.Errors.length > 0){
            for(let i =0; i<responseError.error.Errors.length; i++){
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error!");
            } }
          });
        }else{
          this.toastrService.error("Invalid form information.","Sorry.");
        }
      }
      addCar(){
        if(this.carAddForm.valid){
          let carModel = Object.assign({},this.carAddForm.value) 
          this.carService.add(carModel).subscribe(response=>{
            this.toastrService.success(response.message,"Good Job!")
    
          },responseError=>{
            if(responseError.error.Errors.length>0){
              for(let i =0;i<responseError.error.Errors.length;i++){
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error!")
    
              }
    
            }
            
            
          })
    
        }else{
            this.toastrService.info("Invalid form information.","Sorry.")
        }
    
      }
    
  } 
  


