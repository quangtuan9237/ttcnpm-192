import { MasterCart } from './../models/app-master-cart';
import { Router, ActivatedRoute } from '@angular/router';
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
  masterCart : MasterCart
  displayedColumns = ['thumbnail', 'title', 'quantity', 'total_price'];
  selectedVendorIds: any;
  sub2: Subscription;
  sub: Subscription

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
  }

  async ngOnInit(){
    let cart$ = await this.cartService.get();
    this.sub = cart$.subscribe(c => {
      this.masterCart = c;
    })

    this.sub2 = this.activatedRoute.queryParamMap.subscribe(paramMap => {
      let selectedVendorIds = JSON.parse(paramMap.get('selectedVendorIds'))

      if(selectedVendorIds){
        this.selectedVendorIds = selectedVendorIds;
      }
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  async onConfirm(){
    let user = (await this.auth.getUser())
    let userId = "0";

    if(user){
      userId = user.uid;
    }

    let carts = this.masterCart.getSelectedCarts(this.selectedVendorIds);

    let orders = carts.map(cart => {
      return new AppOrder(userId, cart)
    })

    let result = this.orderService.create(orders);

    this.router.navigate(['/order-success'], {
      queryParams: {
        orderIds: JSON.stringify(await result)
      }
    });
  }
}
