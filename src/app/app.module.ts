import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import {FormsModule,ReactiveFormsModule } from "@angular/forms"
import{BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from "./components/car/car.component";
import {BrandComponent } from "./components/brand/brand.component"
import {ColorComponent } from "./components/color/color.component"
import {CustomerComponent } from "./components/customer/customer.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe'
import { DatePipe } from '@angular/common';


import{ToastrModule} from "ngx-toastr"
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { RentalDeleteComponent } from './components/rental-delete/rental-delete.component';
import { CarImageListComponent } from './components/car-image-list/car-image-list.component';
import { CarImageAddComponent } from './components/car-image-add/car-image-add.component';




@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarDetailComponent,
    CartSummaryComponent,
    VatAddedPipe,
    FilterPipePipe,
    ColorPipePipe,
    BrandPipePipe,
   
    
    ColorAddComponent,
    ColorListComponent,
    ColorUpdateComponent,
    ColorDeleteComponent,
    BrandListComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    CarListComponent,
    CarAddComponent,
    CarUpdateComponent,
    CarDeleteComponent,
    LoginComponent,
    RegisterComponent,
    RentalAddComponent,
    ProfileUpdateComponent,
    RentalListComponent,
    RentalDeleteComponent,
    CarImageListComponent,
    CarImageAddComponent,
 
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule ,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }