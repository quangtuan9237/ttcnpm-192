import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/app-shoping-cart';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
  @Input('shopping-cart') cart: ShoppingCart;
  @Input('displayed-columns') displayedColumns: string[];
  @Input('allow-action') allowAction: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
