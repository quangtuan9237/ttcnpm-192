import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  orders$;
  displayedColumns: any[] = ['customer', 'date', 'status', 'view',];

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { 
  }

  ngOnInit(){
    this.orders$ = this.authService.user$.pipe(
      switchMap(user => {
        return this.orderService.getVenderOrders(user.uid);
      })
    )
  }
}
