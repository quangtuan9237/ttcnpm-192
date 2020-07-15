import { switchMap } from 'rxjs/operators';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
// import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { 
    this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
    // this.orders$ = this.orderService.getAll().switchMap(u => )
  }

  // get appUser$(): Observable<AppUser>{
  //   return this.user$.pipe(
  //     switchMap(user => {
  //       if(user){
  //         return this.userService.get(user.uid);
  //       }

  //       return of<AppUser>(null)
  //     })
  //   )
  // }

  ngOnInit(): void {
  }

}
