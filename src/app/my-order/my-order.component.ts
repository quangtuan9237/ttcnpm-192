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
    // lam nhu nay thi duoc, de vay nhe :) show cai order coponent di :/ the hell
    // this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
    // chi lam nhu vay no se subscribe 2 lan do maybe :/ hoac no se bi loi vi no' da subscribe roi :/
    

  }

  // ngOnInit(): void {
  // }

  async ngOnInit(): Promise<void> {
    //  let uid = await (await this.authService.getUser()).uid
    // console.log("nguyet");  
    // ko co chuyen nay dau :/ de tren nay duoi cung v a :/
    this.orders$ = this.authService.user$.pipe(switchMap(u => this.orderService.getOrdersByUser(u.uid)));
    console.log(this.orders$)
    // troi!
    this.orders$.subscribe(orders =>{
      
      // O?
      this.dataSource = new MatTableDataSource(orders)
      this.dataSource.sort = this.sort;
    })


    // lam nhu vay thi khi logout o tab khac, tab nay se ko duoc cap nhat :)
    // let user = await this.authService.getUser()
    // this.orders$ = this.orderService.getOrdersByUser(user.uid)
  }

}
