import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { UserService } from '../../providers/user.service';
import { fadeAnimation } from '../../_animations/fade.animation';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserService, AuthService],
  animations: [fadeAnimation]
})
export class SignupComponent {
  public newUser = {
    email: '',
    password: '',
    displayName: ''
  };

  public isStrongPass: Boolean = false;

  constructor(public auth: AuthService, public router: Router, public userService: UserService, private toasterService: ToasterService) { }

  public signUp() {
    if (!this.newUser.email || !this.newUser.password || !this.newUser.displayName) {
      this.toasterService.pop('error', 'Error', 'All fields are required. Display Name can be changed after login.');
    } else if (!this.strongPassword(this.newUser.password)) {
      this.toasterService.pop('error', 'Error', 'Password is not strong enough.');
    } else {
      this.userService.addUser(this.newUser).then((res: any) => {
        if (res.success) {
          this.auth.user$.subscribe((response) => {
            const currentUser = response;
            this.router.navigate(['/profile', currentUser.uid]);
          });
        } else {
          this.toasterService.pop('error', 'Error', res);
        }
      });
    }
  }

  private strongPassword(pass: string) {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    if (strongRegex.test(pass)) {
      this.isStrongPass = true;
    }
    return this.isStrongPass;
  }
}
