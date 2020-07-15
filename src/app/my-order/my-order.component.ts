import { switchMap } from 'rxjs/operators';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  orders$;
  displayedColumns: any[] = ['customer', 'date', 'view'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { 
    this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
    
  }

  // ngOnInit(): void {
  // }

  async ngOnInit(): Promise<void> {
    // let uid = await (await this.authService.getUser()).uid
    // console.log("nguyet");  
    this.orders$.subscribe(orders =>{
      this.dataSource = new MatTableDataSource(orders)
      this.dataSource.sort = this.sort;
    })
  }

}
