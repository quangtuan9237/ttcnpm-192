import { MasterCart } from './../models/app-master-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-favorite-product',
  templateUrl: './favorite-product.component.html',
  styleUrls: ['./favorite-product.component.scss']
})
export class FavoriteProductComponent implements OnInit, OnDestroy {
  products: AppProduct[];
  favorite = {};
  displayProducts: AppProduct[];
  masterCart: MasterCart;
  userId: string
  subscription: Subscription
  subscription2: Subscription;
  productSub: Subscription;
  favoriteSub: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private favoriteService: FavoriteService
  ) {

    this.favoriteSub = this.authService.user$.pipe(
      switchMap(user => {
        return this.favoriteService.getAllIds(user.uid);
      })
    ).subscribe(favorite => {
      if(favorite) this.favorite = favorite;
      else this.favorite = {};
      // console.log("favorite changed", this.favorite)
    })

    this.productSub = this.authService.user$.pipe(
      switchMap(user => {
        return this.favoriteService.getAll(user.uid).pipe(
          switchMap(products => {
            this.products = products;
            return this.activatedRoute.queryParamMap
          })  
        )
      })
    )
    .subscribe(params => {
      let categories = JSON.parse(params.get("categories")) as Array<any>;
      let vendors = JSON.parse(params.get("vendors")) as Array<any>;
      let sortType = params.get("sortType") as string;
      let searchText = params.get("searchText") as string;
      searchText = searchText?.trim().toLocaleLowerCase();

      let filteredProducts = [...this.products];
      filteredProducts = (searchText) ? filteredProducts.filter(p => p.title.toLocaleLowerCase().includes(searchText)) : filteredProducts;
      filteredProducts = (categories && categories.length != 0) ? filteredProducts.filter(p => categories.includes(p.category.toString())) : filteredProducts;
      filteredProducts = (vendors && vendors.length != 0) ? filteredProducts.filter(p => vendors.includes(p.vendorId)) : filteredProducts;
      
      if(sortType == "PL2H"){
        // console.log("PL2H")
        filteredProducts.sort((a,b) => {
          return a.price - b.price
        })
      }else if(sortType == "PH2L"){
        // console.log("PH2L")
        filteredProducts.sort((a,b) => {
          return b.price - a.price
        })
      }else if(sortType == "Alphabet"){
        // console.log("alphabet")
        filteredProducts.sort((a,b) => {
          return a.title > b.title ? 1 : -1
        })
      }

      this.displayProducts = filteredProducts;
    })
  }

  async ngOnInit(){
    this.subscription = (await this.cartService.get()).subscribe(cart => {
      this.masterCart = cart
    })

    this.subscription2 = this.authService.user$.subscribe(user => {
      if(user){
        this.userId = user.uid;
      }else{
        this.userId = null;
      }
    })
  }

  async ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.favoriteSub.unsubscribe();
    this.productSub.unsubscribe();
  }
}
