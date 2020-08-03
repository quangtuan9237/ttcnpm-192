import { switchMap } from 'rxjs/operators';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  orders$ : Observable<any>;
  displayedColumns: any[] = ['customer', 'date', 'status', 'view',];

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { 
  }

  async ngOnInit(): Promise<void> {
    this.orders$ = this.authService.user$.pipe(
      switchMap(u => this.orderService.getSeflOrders(u.uid))
    );
  }
}
