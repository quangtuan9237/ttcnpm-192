import { MasterCart } from './../models/app-master-cart';
import { AppProduct } from './../models/app-product';
import { ShoppingCart } from './../models/app-shoping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { FavoriteService } from '../favorite.service';
import { switchMap } from 'rxjs/operators';
// import { MatTooltipModule } from '@angular/material/tooltip';

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

  async addToFavorite(product){
    if (this.userId) {
      this.favoriteService.create(product.key, this.userId);
    }
  }
}
