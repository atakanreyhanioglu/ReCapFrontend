import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44334/api/"
  constructor(private httpClient: HttpClient) { }
  getBrands() : Observable<ListResponseModel<Brand>> {

    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"brands/getall")
       
       };

       add(brand:Brand):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/add",brand)
      }
      delete(brand:Brand):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/delete",brand)
      }
  
}