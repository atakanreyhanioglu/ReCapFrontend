import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl="https://localhost:44334/api/"
  constructor(private httpClient: HttpClient) { }
  getColors() : Observable<ListResponseModel<Color>> {

    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"colors/getall")
       
       };

       add(color:Color):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/add",color)
      }
}