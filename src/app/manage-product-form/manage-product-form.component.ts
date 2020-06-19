import { AppProduct } from './../models/app-product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-manage-product-form',
  templateUrl: './manage-product-form.component.html',
  styleUrls: ['./manage-product-form.component.scss']
})
export class ManageProductFormComponent implements OnInit {
  product_id: String
  product = new AppProduct()
 
  constructor(
    private productService: ProductService,
    public domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) { 

    this.product_id = this.route.snapshot.paramMap.get('id');
    if(this.product_id) this.productService.get(this.product_id).pipe(take(1)).subscribe(p => this.product = new AppProduct(p));
  }

  ngOnInit(): void {
  }

  save(product){
    if(this.product_id) this.productService.update(this.product_id, product)
    else this.productService.create(product);

    this.router.navigate(['../'], {relativeTo: this.route});
  }

  delete(){
    if(!confirm("Are you sure you want to delete this product?")) return;
    this.productService.delete(this.product_id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
