
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../../providers/auth.service';
import { UserCredentials } from '../../data/interfaces/usercredentials';
import { fadeAnimation } from '../../_animations/fade.animation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation]
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup;
  public isLoggingIn: boolean;
  constructor(public authService: AuthService, private fb: FormBuilder, public router: Router, private toasterService: ToasterService) {}

  public ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/admin/profile', user.uid]);
      }
    });
    this.signInForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  public async login(): Promise<void> {
    if (!this.isLoggingIn) {
      this.isLoggingIn = true;
      try {
        await this.authService.login(this.signInForm.value as UserCredentials);
        this.toasterService.pop('success', 'Success', 'Login Successful');
        this.isLoggingIn = false;
        this.router.navigate(['home']);
      } catch (error) {
        this.isLoggingIn = false;
        console.log(error);
        this.toasterService.pop('error', 'Error', 'Login failed');
      }
    }
  }
}
