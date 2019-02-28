
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { SecurePageComponent } from './secure-page/secure-page.component';
import { LoginComponent } from '../authentication/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'secure-page', component: SecurePageComponent },
  { path: '**', component: LoginComponent },
];

export const pageRouting: ModuleWithProviders = RouterModule.forChild(routes);
