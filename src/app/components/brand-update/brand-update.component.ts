import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand : Brand;
  brandUpdateForm : FormGroup;

  constructor(private brandService:BrandService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.createBrandForm()
    this.activatedRoute.params.subscribe(params =>{
      if(params["brandId"]){
        this.getBrandById(params["brandId"])
      }
    })
  }
  getBrandById(brandId : number){
    this.brandService.getByBrandId(brandId).subscribe(response =>{
      this.brand = response.data
    })
  }

  createBrandForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandName : ["",Validators.required]
    })
  }

  update(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({},this.brandUpdateForm.value)
      brandModel.brandId = this.brand.brandId
      this.brandService.update(brandModel).subscribe(response =>{
        this.toastrService.success(response.message,"Good Job!")
      }
      , (responseError)=>
      {
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error!")
          }
        }

      }
      );
      this.backToList()

    }
    
    else{
      this.toastrService.error("Invalid form information.","Sorry.")
    }
  }





  backToList(){
    this.router.navigate(["brands/list"])
  }


}
