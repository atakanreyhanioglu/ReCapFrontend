import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl="https://localhost:44334/api/colors/"
  constructor(private httpClient: HttpClient) { }
  getColors() : Observable<ListResponseModel<Color>> {

    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"getall")
       
       };
       getByColorId(id:number):Observable<SingleResponseModel<Color>>{
        let newPath = this.apiUrl + "getbyid?id=" + id
        return this.httpClient.get<SingleResponseModel<Color>>(newPath)
      }

       add(color:Color):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color)
      }
      update(color:Color):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl+"update", color)
      }
      delete(color:Color):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl+"delete", color)
      }
}