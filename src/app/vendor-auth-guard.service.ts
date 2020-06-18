import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendorAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService
  ) { }

  canActivate(){
    return this.auth.appUser$.pipe(
      map(user => user.isVendor)
    )
  }
}
