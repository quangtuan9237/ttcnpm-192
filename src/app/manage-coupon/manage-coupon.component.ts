import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { CouponService } from './../coupon.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-coupon',
  templateUrl: './manage-coupon.component.html',
  styleUrls: ['./manage-coupon.component.scss']
})
export class ManageCouponComponent implements OnInit {

  coupon$: Observable<any>;
  displayedColumns: string[] = ['id', 'name', 'level', 'edit'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private CouponService: CouponService
  ) {
    this.CouponService.getAll().subscribe(coupons => {
      this.dataSource = new MatTableDataSource(coupons)
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
  }

}
