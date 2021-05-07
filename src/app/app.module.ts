import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http"
import {FormsModule,ReactiveFormsModule } from "@angular/forms"
import{BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from "./components/car/car.component";
import { RentalComponent } from "./components/rental/rental.component"
import {BrandComponent } from "./components/brand/brand.component"
import {ColorComponent } from "./components/color/color.component"
import {CustomerComponent } from "./components/customer/customer.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe'

import{ToastrModule} from "ngx-toastr"
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';



@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    RentalComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarDetailComponent,
    CartSummaryComponent,
    VatAddedPipe,
    FilterPipePipe,
    ColorPipePipe,
    BrandPipePipe
    
    

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }