import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';

const routes: Routes = [{path:"",pathMatch:"full",component:CarComponent},
{path:"cars",component:CarComponent},
{path:"cars/brand/:brandId",component:CarComponent},
{path:"cars/color/:colorId",component:CarComponent},
{path:"cars/cardetail/:carId",component:CarDetailComponent},
{path:"cars/car/:carId",component : CarComponent},
{path:"cars/brand/:brandId/color/:colorId",component: CarComponent},
{path:"cars/payment", component : CartSummaryComponent},
{path:"cars/add/brand", component : BrandAddComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
