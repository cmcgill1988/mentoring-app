
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: '**', component: HomePageComponent },
];

export const pageRouting: ModuleWithProviders = RouterModule.forChild(routes);
