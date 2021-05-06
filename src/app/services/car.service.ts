import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl ="https://localhost:44334/api/";
  constructor(private httpClient : HttpClient) { }



  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getalldetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);

  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailsById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getbycarid?carId='+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetailByColorAndBrand(brandId:number, colorId:number){
    let newPath=this.apiUrl + "cars/getbybrandandcolor?brandId="+brandId+ "&colorId=" +colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }


}