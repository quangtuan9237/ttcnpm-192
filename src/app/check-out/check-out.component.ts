import { Router } from '@angular/router';
import { AppOrder } from './../models/app-order';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/app-shoping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  // cart
  user: AppUser;
  cart$ : Observable<ShoppingCart>
  shoppingCart : ShoppingCart
  sub: Subscription
  userId: string
  userName: string
  totalItems
  totalAllPrice
  userSubscription: Subscription
  appUserSub: Subscription

  displayedColumns = ['thumbnail', 'title', 'quantity', 'total_price'];

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private auth: AuthService,
    private router: Router,
  ) { 
  }

  async ngOnInit(){
    this.cart$ = await this.cartService.get();
    this.sub = this.cart$.subscribe(c => {
      this.shoppingCart = c;
      // console.log("cart", this.shoppingCart)
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.userSubscription.unsubscribe();
    this.appUserSub.unsubscribe()
  }

  async placeOrder(){
    let userId = (await this.auth.getUser()).uid;
    let order = new AppOrder(userId, this.shoppingCart);
    let result = this.orderService.create(order);
    this.router.navigate(['/order-success', (await result).key]);
  }
}
