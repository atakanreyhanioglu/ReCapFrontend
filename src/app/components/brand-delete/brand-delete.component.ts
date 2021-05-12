import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {
  brand:Brand;
  id:number;
  brandName:string;

  constructor(private brandService:BrandService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
      if(params["brandId"]){
        this.getByBrandId(params["brandId"])
      
      }
    })
  }
  getByBrandId(brandId:number){
    this.brandService.getByBrandId(this.activatedRoute.snapshot.params["brandId"]).subscribe(response=>{
      this.brand = response.data
      this.id =this.brand.brandId
      this.brandName = this.brand.brandName
      console.log(this.brand)

    })
  }

  
  delete(){
    if (this.brand) {
      this.brandService.delete(this.brand).subscribe(response=>{
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
    this.router.navigate(["brands/list"]);
  }

}
