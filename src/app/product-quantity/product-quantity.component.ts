import { Component, OnInit, Input } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { ShoppingCart } from '../models/app-shoping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product: AppProduct;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    public cart: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }
}
