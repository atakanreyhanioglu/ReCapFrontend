import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44334/api/brands/"
  constructor(private httpClient: HttpClient) { }
  getBrands() : Observable<ListResponseModel<Brand>> {

    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"getall")
       
       };
       getByBrandId(id:number):Observable<SingleResponseModel<Brand>>{
        let newPath = this.apiUrl + "getbyid?id=" + id
        return this.httpClient.get<SingleResponseModel<Brand>>(newPath)
      }

       add(brand:Brand):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl+"add",brand)
      }
      update(brand:Brand):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl+"update", brand)
      }
      delete(brand:Brand):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",brand)
      }
  
}