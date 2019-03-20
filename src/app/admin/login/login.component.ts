
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../../providers/auth.service';
import { UserCredentials } from '../../data/interfaces/usercredentials';
import { fadeAnimation } from '../../_animations/fade.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation]
})
export class LoginComponent implements OnInit {
  credentials = {} as UserCredentials;

  constructor(public authService: AuthService, public router: Router, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  signIn() {
    if (!this.credentials.email || !this.credentials.password) {
      this.toasterService.pop('error', 'Error', 'Please enter both your email and password.');
    } else {
      this.authService.login(this.credentials).then((res: any) => {
        if (!res.code) {
          this.router.navigate(['/']);
          this.toasterService.pop('success', 'Success', 'Login Successful');
        } else {
          alert(res);
          this.toasterService.pop('error', 'Error', 'Login failed');
        }
      }).catch((err) => {
        this.toasterService.pop('error', 'Error', err);
      });
    }
  }
}
