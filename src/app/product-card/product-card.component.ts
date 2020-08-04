import { MasterCart } from './../models/app-master-cart';
import { AppProduct } from './../models/app-product';
import { ShoppingCart } from './../models/app-shoping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: AppProduct;
  @Input('show-action') showAction = false;
  @Input('shopping-cart') masterCart: MasterCart;
  @Input('user-id') userId: string;
  @Input('is-favorite') isFavorite: boolean = false;

  constructor(
    public domSanitizer: DomSanitizer,
    private cartService: ShoppingCartService,
    private favoriteService: FavoriteService,
    ) { }

  ngOnInit(): void {
  }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  removeFromCart(product){
    this.cartService.removeFromCart(product);
  }

  async onClickFavorite(product){
    if (this.userId) {
      if(!this.isFavorite){
        this.favoriteService.create(product.key, this.userId);
      }else{
        this.favoriteService.delete(product.key, this.userId);
      }

      this.isFavorite = !this.isFavorite;
    }
  }
}
