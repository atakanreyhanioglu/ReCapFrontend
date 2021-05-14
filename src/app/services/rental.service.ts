import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';
import { RentalNormal } from '../models/rentalNormal';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44334/api/rentals/"
  constructor(private httpClient:HttpClient) { }

  getRentals(): Observable<ListResponseModel<Rental>>{
    return  this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getrentaldetails")
    
  }
  getRentalByCarId(carId:number): Observable<ListResponseModel<Rental>>{
    return  this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getbycarid?carId="+carId)
    
  }
  getNormalRentals():Observable<ListResponseModel<RentalNormal>>{
    return this.httpClient.get<ListResponseModel<RentalNormal>>(this.apiUrl+"getall")
  }
  
  addRental(rental:RentalNormal):Observable <ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",rental)
  }
  updateRental(rental:RentalNormal):Observable <ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",rental)
  }
  deleteRental(rental:RentalNormal):Observable <ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",rental)
  }
  
}