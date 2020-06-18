import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-manage-product-form',
  templateUrl: './manage-product-form.component.html',
  styleUrls: ['./manage-product-form.component.scss']
})
export class ManageProductFormComponent implements OnInit {

  constructor(
    private productService: ProductService,
    public domSanitizer: DomSanitizer,
  ) { 
  }

  ngOnInit(): void {
  }

  save(value){
    this.productService.create(value);
  }

}
