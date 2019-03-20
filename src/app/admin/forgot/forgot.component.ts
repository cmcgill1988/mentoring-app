
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { fadeAnimation } from '../../_animations/fade.animation';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  animations: [fadeAnimation]
})

export class ForgotComponent {
  public email: string;

  constructor(public userService: UserService, public router: Router, private toasterService: ToasterService) { }
  public async resetPassword(): Promise<void> {
    try {
      await this.userService.passwordReset(this.email);
      this.toasterService.pop('success', 'Success', 'Check your email for a password reset email');
    } catch (error) {
      console.log(error);
      this.toasterService.pop('error', 'Error', 'Password reset');
    }
  }
}

