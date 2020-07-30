import { AppProduct } from './../models/app-product';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
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
  products: AppProduct[];
  displayProducts: AppProduct[];
  shoppingCart;
  subProduct: Subscription
  subscription: Subscription

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subProduct = this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.activatedRoute.queryParamMap
      })
    ).subscribe(params => {
      let categories = JSON.parse(params.get("categories")) as Array<any>;
      let vendors = JSON.parse(params.get("vendors")) as Array<any>;
      let sortType = params.get("sortType") as string;
      let searchText = params.get("searchText") as string;
      searchText = searchText?.trim().toLocaleLowerCase();

      let filteredProducts = [...this.products];
      filteredProducts = (searchText) ? filteredProducts.filter(p => p.title.toLocaleLowerCase().includes(searchText)) : filteredProducts;
      filteredProducts = (categories && categories.length != 0) ? filteredProducts.filter(p => categories.includes(p.category.toString())) : filteredProducts;
      filteredProducts = (vendors && vendors.length != 0) ? filteredProducts.filter(p => vendors.includes(p.owner)) : filteredProducts;
      
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

      // console.log("leght:",this.displayProducts.length);
    })
  }

  async ngOnInit(){
    this.subscription = (await this.cartService.get()).subscribe(cart => {
      this.shoppingCart = cart
    })
  }

  async ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subProduct.unsubscribe();
  }
}
