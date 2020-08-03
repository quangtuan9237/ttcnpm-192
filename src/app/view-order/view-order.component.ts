import { Component} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { ActivatedRoute} from '@angular/router';
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
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) { 
  }

  async ngOnInit(): Promise<void> {
    this.order_id = this.route.snapshot.paramMap.get('id');   

    this.orders$ = this.orderService.get(this.order_id);
  }

  totalItemCount(items){
    return items.reduce((acc, i) => acc + i.quantity, 0)
  }

  totalPrice(items){
    return items.reduce((acc, i) => acc + i.totalPrice, 0)
  }
}
