import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { windowWhen } from 'rxjs/operators';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: AppUser;
  cart$

  constructor(
    public auth: AuthService,
    private cart: ShoppingCartService
    ) {
    this.auth.appUser$.subscribe((user) => this.user = user);
  }

  async ngOnInit(){
    this.cart$ = (await this.cart.get())
  }

  logout(){
    this.auth.logout();
  }

}
