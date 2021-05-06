import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44334/api/rentals/getrentaldetails"
  constructor(private httpClient:HttpClient) { }

  getRentals(): Observable<ListResponseModel<Rental>>{
    return  this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl)

  }
}