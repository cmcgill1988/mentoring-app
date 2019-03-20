import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { UserService } from '../../providers/user.service';
import { fadeAnimation } from '../../_animations/fade.animation';
import { AuthService } from '../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export const strongPassRegex: RegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserService, AuthService],
  animations: [fadeAnimation]
})
export class SignupComponent implements OnInit {
  public registrationForm: FormGroup;
  public isSignedUp: boolean = false;
  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toasterService: ToasterService) { }

  public ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.pattern(strongPassRegex)])],
      displayName: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  public async signUp(): Promise<void> {
    try {
      await this.userService.addUser(this.registrationForm.value);
      this.auth.user$.subscribe((response) => {
        if (response.uid) {
          this.router.navigate(['/admin/profile', response.uid]);
        }
      });
      this.isSignedUp = true;
    } catch (error) {
      this.isSignedUp = false;
      this.toasterService.pop('error', 'Error', 'Sign up failed please try again');
      console.error(error);
    }
  }

  public shouldDisplayErrorMessage(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !control.valid && control.dirty && control.value;
  }
}
