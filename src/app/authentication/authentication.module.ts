import { AuthenticationService } from './authentication.service';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authRouting } from './authentication.routing';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, UserProfileComponent],
  exports: [LoginComponent, RegisterComponent, ForgotPasswordComponent, UserProfileComponent],
  imports: [
    CommonModule,
    authRouting
  ],
  providers: [AuthenticationService]
})
export class AuthenticationModule { }
