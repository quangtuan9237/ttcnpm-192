import { RoleService } from './role.service';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable, Observer, observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { switchMap } from 'rxjs/operators';
import {of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    ) {
   this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  
  logout(){
    this.router.navigate(['/']);
    this.afAuth.signOut();
  }

  async getUser(){
    return await (this.afAuth.currentUser)
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => {
        if(user){
          return this.userService.get(user.uid);
        }

        return of<AppUser>(null)
      })
    )
  }
}

