import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { MasterCart } from '../models/app-master-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: AppUser;
  searchText: string;
  cart$: Observable<MasterCart>;

  constructor(
    public auth: AuthService,
    private cart: ShoppingCartService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.auth.appUser$.subscribe((user) => this.user = user);
  }

  async ngOnInit(){
    this.cart$ = (await this.cart.get())
  }

  logout() {
    this.auth.logout();
  }

  onChangeSearch(text){
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {
        searchText: text
      },
      queryParamsHandling: 'merge'
    }
    
    this.router.navigate(['/'], navigationExtras)
  }

}
