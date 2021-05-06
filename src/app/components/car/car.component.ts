import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  defaultPath = 'https://localhost:44334';
  cars: Car[] = [];
  brands:Brand[]=[];
  colors:Color[]=[];
  dataLoaded = false;
  filterText = '';
  filterBrandId : number = 0;
  filterColorId :number = 0;

  constructor(
    private carService: CarService,
    private colorService:ColorService,
    private brandService:BrandService,
    private carImageService: CarImageService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllColors();
    this.activedRoute.params.subscribe((params) => {
      if(params['colorId'] && params['brandId']){
        this.getCarDetailByColorAndBrand(params['colorId'],params['brandId']);
      }
      else if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      console.log(this.cars);
    });
  }
  getAllBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      console.log(this.brands);
    });
  }
  getAllColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      console.log(this.colors);
    });
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetailByColorAndBrand(brandId: number, colorId: number){
    this.carService.getCarDetailByColorAndBrand(brandId, colorId)
    .subscribe((response) => {
      console.log(response)
      this.cars = response.data;
    });
  }

  addToCart(car: Car) {
    this.toastrService.success('Added to car', car.carName);
    this.cartService.addToCart(car);
  }
  
}
