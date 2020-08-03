import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { switchMap } from 'rxjs/operators';
import { AppOrder } from '../models/app-order';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  @Input('order') order: AppOrder;
  @Input('displayed-columns') displayedColumns: AppOrder;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
