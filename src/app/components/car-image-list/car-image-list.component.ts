import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-image-list',
  templateUrl: './car-image-list.component.html',
  styleUrls: ['./car-image-list.component.css']
})
export class CarImageListComponent implements OnInit {
  cars:Car[]= [];
  defaultPath = 'https://localhost:44334';

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCarDetails();
  }

  getCarDetails(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
    })
  }
}
