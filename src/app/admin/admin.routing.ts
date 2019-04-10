import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthenticatedGuard } from '../route-guards/authenticated.guard';

export const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotComponent },
      { path: 'sign-up', component: SignupComponent },
      { path: 'profile/:uid', component: ProfileComponent, canActivate: [AuthenticatedGuard] },
    ]
  }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(routes);
