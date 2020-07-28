import { Subscription } from 'rxjs';
import { CategoriesService } from './../categories.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { strict } from 'assert';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss']
})
export class FilterProductsComponent implements OnInit{
  categories$
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  sortType = 0;

  constructor(
    private categoriesService: CategoriesService
  ) { 
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();
  }
}
