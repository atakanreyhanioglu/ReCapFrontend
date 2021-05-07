import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carImages:CarImage[]=[];
  car!:Car;
  defaultPath="https://localhost:44334"
  
  constructor(private carService:CarService,private carImageService:CarImageService, 
    private toastrService:ToastrService,private cartService:CartService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarsByCarId(params["carId"]),
        this.getCarImages(params["carId"])
      }
    })
  }
  getCarImages(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data;
      console.log(this.carImages);
      console.log(response)
    })
  }
  getCarsByCarId(carId:number){
    this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.car = response.data[0];
    })
  }
  getImagePath(image:string){
    return this.defaultPath + image;
  }
  addToCart(car: Car) {
    this.toastrService.success('Added to cart', car.carName);
    this.cartService.addToCart(car);
  }

}
