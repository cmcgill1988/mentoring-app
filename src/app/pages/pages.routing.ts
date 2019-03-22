
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { SecurePageComponent } from './secure-page/secure-page.component';
import { LoginComponent } from '../authentication/login/login.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, data: { animation: 'isRight' } },
  { path: 'secure-page', component: SecurePageComponent, data: { animation: 'isLeft' } },
  { path: 'blog', component: BlogPageComponent, data: { animation: 'isRight' } },
  { path: 'login', component: LoginComponent, data: { animation: 'isRight' } },
  { path: 'admin', loadChildren: '../admin/admin.module#AdminModule', data: { animation: 'isRight' }},
  { path: '**', component: ErrorPageComponent, data: { animation: 'isLeft' } },
];

export const pageRouting: ModuleWithProviders = RouterModule.forChild(routes);
