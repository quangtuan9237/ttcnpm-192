import { ShoppingCartService } from './../shopping-cart.service';
import { MyOrderComponent } from './../my-order/my-order.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { switchMap, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCart } from '../models/app-shoping-cart';
import { ShoppingCartItem } from '../models/app-shoping-cart-item';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent  {
  orders$: Observable<unknown>;
  order_id;
  sub: Subscription;
  displayedColumns = ['thumbnail', 'title', 'quantity', 'total_price'];
  items: ShoppingCartItem[] = []
  
  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
  }

  async ngOnInit(): Promise<void> {
    this.order_id = this.route.snapshot.paramMap.get('id');   

    this.orders$ = this.orderService.getOrdersById(this.order_id);

    this.orders$.subscribe(data => {
      console.log(data)
    })
  }

  totalItemCount(items){
    return items.reduce((acc, i) => acc + i.quantity, 0)
 }

 totalPrice(items){
  return items.reduce((acc, i) => acc + i.totalPrice, 0)
}

}
