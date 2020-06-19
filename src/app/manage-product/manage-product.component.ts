import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductService } from './../product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  products$: Observable<any>;
  displayedColumns: string[] = ['title', 'price', 'category', 'edit'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private productService: ProductService
  ) {
    this.productService.getAll().subscribe(products =>{
      this.dataSource = new MatTableDataSource(products)
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
  }
}
