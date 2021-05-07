import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Rental } from '../models/rental';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  rentals : Rental[]=[]
  dailyPrice : number
  constructor() { }

  getDailyPrice(car:Car){
    this.dailyPrice = car.dailyPrice;
  }

  addToCart(car:Car){
    let item = CartItems.find(c=>c.car.carId===car.carId);
      this.getDailyPrice(car);
    if(item){
        item.quantity==1;
    }else{
      let cartItem =new CartItem();
      cartItem.car =car
      cartItem.quantity=1;
      CartItems.push(cartItem)
    }

  }
  removeFromCart(car:Car){
    let item: CartItem = CartItems.find(c=>c.car.carId===car.carId);
    CartItems.splice(CartItems.indexOf(item),1);
  }
  

list():CartItem[]{
  return CartItems
}

}
