import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  orders$;

  constructor(private orderService: OrderService) { 
    this.orders$ = this.orderService.getAll();
    // console.log(this.orders$);
  }

  ngOnInit(): void {
  }
}
