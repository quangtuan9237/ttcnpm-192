import { AppProduct } from './../models/app-product';
import { ShoppingCart } from './../models/app-shoping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: AppProduct;
  @Input('show-action') showAction = false;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    public domSanitizer: DomSanitizer,
    private cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  removeFromCart(product){
    this.cartService.removeFromCart(product);
  }

  getQuantity(product: AppProduct){
    if(!this.shoppingCart) return 0;
    return this.shoppingCart.getItemQuantity(product);
  }
}
