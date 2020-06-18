import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: AppUser;

  constructor(public auth: AuthService) {
    this.auth.appUser$.subscribe((user) => this.user = user);
  }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
  }

}
