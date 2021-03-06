import { BlogPageComponent } from './blog-page/blog-page.component';
import { CanvasPageComponent } from './canvas-page/canvas-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from '../authentication/login/login.component';
import { MasonryPageComponent } from './masonry-page/masonry-page.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurePageComponent } from './secure-page/secure-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AuthenticatedGuard } from '../route-guards/authenticated.guard';
import { AdminOnlyPageComponent } from './admin-only-page/admin-only-page.component';
import { IsAdminGuard } from '../route-guards/isAdmin.guard';

export const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, data: { animation: 'firstPage' } },
  { path: 'secure-page', component: SecurePageComponent, data: { animation: 'securePage' }, canActivate: [AuthenticatedGuard] },
  {
    path: 'admin-only',
    component: AdminOnlyPageComponent,
    data: {
      animation: 'adminPage'
    },
    canActivate: [IsAdminGuard],
  },
  { path: 'blog/:uid', component: BlogPageComponent, data: { animation: 'blogPage' } },
  { path: 'canvas', component: CanvasPageComponent, data: { animation: 'canvasPage' } },
  { path: 'masonry', component: MasonryPageComponent, data: { animation: 'masonryPage' } },
  { path: 'about', component: AboutPageComponent, data: { animation: 'aboutPage' } },
  { path: 'login', component: LoginComponent, data: { animation: 'loginPage' } },
  { path: 'admin', loadChildren: '../admin/admin.module#AdminModule', data: { animation: 'adminPage' } },
  { path: 'error', component: ErrorPageComponent, data: { animation: 'errorPage' } },
  { path: '**', component: ErrorPageComponent, data: { animation: 'errorPage' } },
];

export const pageRouting: ModuleWithProviders = RouterModule.forChild(routes);
