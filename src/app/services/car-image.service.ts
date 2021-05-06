import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CarImage } from '../models/carImage';

import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl ="https://localhost:44334/api/";
  constructor(private httpClient : HttpClient) { }
  getCarImagesByCarId(carId:number): Observable<ListResponseModel<CarImage>>
  {
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl+"carimages/getbycarid?carid="+carId);

  };
 



}
