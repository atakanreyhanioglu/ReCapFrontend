import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {

  defaultPath = 'https://localhost:44334';
  images : CarImage[] = [];  
  imageFile : any
  carId:number
  car:Car;

  constructor( private activatedRoute: ActivatedRoute, 
    private imageService:CarImageService,
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private router:Router,
    private toastrService: ToastrService,private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.carId = params["carId"]
        this.getCarByCarId(params["carId"])
        this.getImagesByCarId(params["carId"])

      }
    });
  }
  getCarByCarId(carId:number){
    this.carService.getCarDetailsById(carId).subscribe((response)=>{
      this.car=response.data[0]

    })
  }
  getImagesByCarId(carId:number){
    this.imageService.getCarImagesByCarId(carId).subscribe((response)=>{
      this.images=response.data
    })

  }
  add(){
    const image: FormData = new FormData();
    image.append('carId', this.carId.toString());
    image.append("Image", this.imageFile, this.imageFile.name);

    console.log(image)
    this.imageService.add( image ).subscribe(response=>{
      this.toastrService.success(response.message)
      this.getImagesByCarId(this.carId)
    },responseError=>{
      this.toastrService.error(responseError.error.message)
    })
  }
  fileSelected(event:any) {
    this.imageFile = event.target.files[0]
    event.target.nextElementSibling.innerText=this.imageFile.name
  }
}
