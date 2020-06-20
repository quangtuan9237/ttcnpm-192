import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product;
  @Input('show-action') showAction = false;
  @Input('shopping-cart') shoppingCart;

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

  getQuantity(product){
    if(!this.shoppingCart) return 0;
    
    let item = this.shoppingCart.items[product.key];
    return item? item.quantity : 0;
  }
}
