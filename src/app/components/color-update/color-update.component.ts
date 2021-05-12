import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  color : Color;
  colorUpdateForm : FormGroup;

  
  constructor(private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.createColorForm()
    this.activatedRoute.params.subscribe(params =>{
      if(params["colorId"]){
        this.getColorById(params["colorId"])
      }
    })
  }

  getColorById(colorId : number){
    this.colorService.getByColorId(colorId).subscribe(response =>{
      this.color = response.data
    })
  }

  createColorForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorName : ["",Validators.required]
    })
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({},this.colorUpdateForm.value)
      colorModel.colorId = this.color.colorId
      this.colorService.update(colorModel).subscribe(response =>{
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
    this.router.navigate(["colors/list"])
  }

}
