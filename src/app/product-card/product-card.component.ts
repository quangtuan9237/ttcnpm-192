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

  constructor(
    public domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
  }

}
