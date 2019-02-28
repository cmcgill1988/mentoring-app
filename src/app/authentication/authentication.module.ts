import { AuthenticationService } from './authentication.service';
import { authRouting } from './authentication.routing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserProfileComponent],
  exports: [LoginComponent, RegisterComponent, UserProfileComponent],
  imports: [
    CommonModule,
    authRouting,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
    }),
  ],
  providers: [AuthenticationService]
})
export class AuthenticationModule { }
