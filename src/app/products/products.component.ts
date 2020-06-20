import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$
  shoppingCart
  subscription: Subscription

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    this.products$ = this.productService.getAll();
  }

  async ngOnInit(){
    this.subscription = (await this.cartService.get()).subscribe(cart => {
      this.shoppingCart = cart
    })
  }

  async ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
