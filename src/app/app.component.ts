import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'first-project';

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {

    this.auth.user$.subscribe((user) => {
      if (!user) return;

      this.userService.save(user);

      let returnURL = localStorage.getItem("returnUrl");
      if (!returnURL) return;

      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnURL);
    })
  }
}
