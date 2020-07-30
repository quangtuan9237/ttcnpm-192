import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { RoleService } from './../role.service';
import { Subscription, Observable } from 'rxjs';
import { CategoriesService } from './../categories.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss']
})
export class FilterProductsComponent implements OnInit{
  categories$: Observable<any>
  vendors$: Observable<any>
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  sortType:string;
  searchText: string;

  constructor(
    private categoriesService: CategoriesService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();
    this.vendors$ = this.roleService.getAllVendor();
    // this.vendors$.subscribe(data => console.log(data))
  }

  onChangeSearch(text){
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {
        searchText: text
      },
      queryParamsHandling: 'merge'
    }
    
    this.router.navigate([], navigationExtras)
  }

  onChangeSortType(){
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {
        sortType: this.sortType
      },
      queryParamsHandling: 'merge'
    }
    
    this.router.navigate([], navigationExtras)
  }

  onChangeVendors(selectedVendorsObj){
    let selectedVendors = selectedVendorsObj.map(cateOjb => {
      return cateOjb.value;
    })

    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {
        vendors: JSON.stringify(selectedVendors)
      },
      queryParamsHandling: 'merge'
    }

    this.router.navigate([], navigationExtras)
  }

  onChangeCategories(selectedCategoriesObj:Array<any>){
    let selectedCategories = selectedCategoriesObj.map(cateOjb => {
      return cateOjb.value;
    })

    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {
        categories: JSON.stringify(selectedCategories)
      },
      queryParamsHandling: 'merge'
    }
   
    this.router.navigate([], navigationExtras)
  }
}
