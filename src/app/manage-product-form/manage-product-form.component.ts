import { AuthService } from './../auth.service';
import { AppProduct } from './../models/app-product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-manage-product-form',
  templateUrl: './manage-product-form.component.html',
  styleUrls: ['./manage-product-form.component.scss']
})
export class ManageProductFormComponent implements OnInit, OnDestroy {
  categories$: Observable<any>
  product_id: String
  user: firebase.User
  product = {} as AppProduct
  userSubscription: Subscription
 
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private categoriesService: CategoriesService
  ) { 

    this.product_id = this.route.snapshot.paramMap.get('id');
    if(this.product_id) {
      this.productService.get(this.product_id).pipe(take(1))
        .subscribe(p => this.product = p);
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();

    this.userSubscription = this.auth.user$.subscribe(user => {
      this.user = user;
    })
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  save(product){
    if(this.product_id) this.productService.update(this.product_id, product)
    else{
      this.productService.create(this.user.uid, product);
    }

    this.router.navigate(['../'], {relativeTo: this.route});
  }

  delete(){
    if(!confirm("Are you sure you want to delete this product?")) return;
    this.productService.delete(this.user.uid, this.product_id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  cancel(){
    if(!confirm("Are you sure you want to cancel this action?")) return;
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
