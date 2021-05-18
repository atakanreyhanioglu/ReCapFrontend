import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarImageAddComponent } from './components/car-image-add/car-image-add.component';
import { CarImageListComponent } from './components/car-image-list/car-image-list.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalDeleteComponent } from './components/rental-delete/rental-delete.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { AlreadyLoginGuard } from './guards/already-login.guard';
import { CartGuardGuard } from './guards/cart-guard.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [{path:"",pathMatch:"full",component:CarComponent},

{path:"rentals/list/delete/:carId", component:RentalDeleteComponent,canActivate:[LoginGuard]},
{path:"rentals/list", component:RentalListComponent,canActivate:[LoginGuard]},

{path:"carimages/list", component:CarImageListComponent,canActivate:[LoginGuard]},
{path:"carimages/list/add/:carId", component:CarImageAddComponent,canActivate:[LoginGuard]},


{path:"users/update",component:ProfileUpdateComponent},
{path:"cars",component:CarComponent},
{path:"cars/brand/:brandId",component:CarComponent},
{path:"cars/color/:colorId",component:CarComponent},
{path:"cars/cardetail/:carId",component:CarDetailComponent},
{path:"cars/car/:carId",component : CarComponent},
{path:"cars/brand/:brandId/color/:colorId",component: CarComponent},
{path:"cars/payment", component : CartSummaryComponent,canActivate:[LoginGuard,CartGuardGuard]},

{path:"colors/list", component:ColorListComponent,canActivate:[LoginGuard]},
{path:"colors/list/add", component:ColorAddComponent,canActivate:[LoginGuard]},
{path:"colors/list/update/:colorId", component:ColorUpdateComponent,canActivate:[LoginGuard]},
{path:"colors/list/delete/:colorId", component:ColorDeleteComponent,canActivate:[LoginGuard]},

{path:"brands/list", component:BrandListComponent,canActivate:[LoginGuard]},
{path:"brands/list/add", component:BrandAddComponent,canActivate:[LoginGuard]},
{path:"brands/list/update/:brandId", component:BrandUpdateComponent,canActivate:[LoginGuard]},
{path:"brands/list/delete/:brandId", component:BrandDeleteComponent,canActivate:[LoginGuard]},

{path:"cars/list", component:CarListComponent,canActivate:[LoginGuard]},
{path:"cars/list/add", component:CarAddComponent, canActivate:[LoginGuard]},
{path:"cars/list/update/:carId", component:CarUpdateComponent,canActivate:[LoginGuard]},
{path:"cars/list/delete/:carId", component:CarDeleteComponent,canActivate:[LoginGuard]},

{path:"login", component:LoginComponent,canActivate:[AlreadyLoginGuard]},
{path:"register", component:RegisterComponent}
















];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
