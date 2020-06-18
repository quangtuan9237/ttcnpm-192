import { map, switchMap } from 'rxjs/operators';
import { Observable, Observer, observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private auth:AuthService
  ) { }

  canActivate(): Observable<boolean>{
    return this.auth.appUser$.pipe(
      map(user => user.isAdmin)
    )
  }
}
