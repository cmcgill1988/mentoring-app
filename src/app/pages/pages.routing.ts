
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { SecurePageComponent } from './secure-page/secure-page.component';
import { LoginComponent } from '../authentication/login/login.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'secure-page', component: SecurePageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'admin', loadChildren: '../admin/admin.module#AdminModule'},
  { path: '**', component: ErrorPageComponent },
];

export const pageRouting: ModuleWithProviders = RouterModule.forChild(routes);
