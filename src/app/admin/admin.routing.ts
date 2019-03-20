import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ForgotComponent } from './forgot/forgot.component';

export const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'admin-login', pathMatch: 'full' },
      { path: 'admin-login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotComponent },
      { path: 'sign-up', component: SignupComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(routes);
