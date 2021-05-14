import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlreadyLoginGuard } from './guards/already-login.guard';
import { LoginGuard } from './guards/login.guard';
import { RentalComponent } from './rental/rental.component';

const routes: Routes = [{path:"",pathMatch:"full",component:CarComponent},
{path:"rentals", component:RentalComponent},


{path:"cars",component:CarComponent},
{path:"cars/brand/:brandId",component:CarComponent},
{path:"cars/color/:colorId",component:CarComponent},
{path:"cars/cardetail/:carId",component:CarDetailComponent},
{path:"cars/car/:carId",component : CarComponent},
{path:"cars/brand/:brandId/color/:colorId",component: CarComponent},
{path:"cars/payment", component : CartSummaryComponent},

{path:"colors/list", component:ColorListComponent},
{path:"colors/list/add", component:ColorAddComponent},
{path:"colors/list/update/:colorId", component:ColorUpdateComponent},
{path:"colors/list/delete/:colorId", component:ColorDeleteComponent},

{path:"brands/list", component:BrandListComponent},
{path:"brands/list/add", component:BrandAddComponent},
{path:"brands/list/update/:brandId", component:BrandUpdateComponent},
{path:"brands/list/delete/:brandId", component:BrandDeleteComponent},

{path:"cars/list", component:CarListComponent},
{path:"cars/list/add", component:CarAddComponent, canActivate:[LoginGuard]},
{path:"cars/list/update/:carId", component:CarUpdateComponent},
{path:"cars/list/delete/:carId", component:CarDeleteComponent},

{path:"login", component:LoginComponent,canActivate:[AlreadyLoginGuard]},
{path:"register", component:RegisterComponent}
















];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
