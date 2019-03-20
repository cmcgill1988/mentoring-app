
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { fadeAnimation } from '../../_animations/fade.animation';
import { UserService } from 'src/app/providers/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  animations: [fadeAnimation]
})

export class ForgotComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public emailSent: boolean;
  constructor(
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toasterService: ToasterService) { }
  public ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }
  public async resetPassword(): Promise<void> {
    try {
      await this.userService.passwordReset(this.forgotPasswordForm.value);
      this.toasterService.pop('success', 'Success', 'Check your email for a password reset email');
      this.emailSent = true;
    } catch (error) {
      console.log(error);
      this.toasterService.pop('error', 'Error', 'Password reset failed please try again');
    }
  }
}

