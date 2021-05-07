import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  cartItems:CartItem[]=[]
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.getPaymentButton();
    
  }
  getPaymentButton(){
        this.cartItems = this.cartService.list();
  }

}
