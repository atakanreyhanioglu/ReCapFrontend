import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent implements OnInit {

  colorDeleteForm : FormGroup;
  color:Color;
  id:number;
  colorName:string;

  constructor(private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { 
    
      
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
      if(params["colorId"]){
        this.getByColorId(params["colorId"])
      
      }
    })
  }

  getByColorId(colorId:number){
    this.colorService.getByColorId(this.activatedRoute.snapshot.params["colorId"]).subscribe(response=>{
      this.color = response.data
      this.id =this.color.colorId
      this.colorName = this.color.colorName

    })
  }

  
  delete(){
    if (this.color) {
      this.colorService.delete(this.color).subscribe(response=>{
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
    this.router.navigate(["colors/list"]);
  }

}