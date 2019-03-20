import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup;
  public emailSent = false;
  constructor(private auth: AuthenticationService, private fb: FormBuilder, private router: Router) {}

  public ngOnInit(): void {
    const url  = this.router.url;
    if (this.auth.isSignedIn(url)) {
      this.router.navigate(['/secure-page']);
    }
    this.generateLoginFormGroup();
  }

  private generateLoginFormGroup(): void {
    this.signInForm = this.fb.group({
      emailInput: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  public async login(): Promise<void> {
    try {
      this.auth.sendEmailLink(this.signInForm.controls.emailInput.value);
      this.emailSent = true;
    } catch (e) {
      console.log('Failure signing in', e);
    }
  }
}
