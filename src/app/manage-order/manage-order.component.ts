import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  orders$;
  displayedColumns: any[] = ['customer', 'date', 'view'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { 
    this.orders$ = this.orderService.getAll();
  }



  async ngOnInit(): Promise<void> {
    // let uid = await (await this.authService.getUser()).uid

    this.orders$.subscribe(order =>{
      this.dataSource = new MatTableDataSource(order)
      this.dataSource.sort = this.sort;
    })
  }


  // constructor(private orderService: OrderService) { 
  //   this.orders$ = this.orderService.getAll();
  //   // console.log(this.orders$);
  // }

  // ngOnInit(): void {
  // }
}
