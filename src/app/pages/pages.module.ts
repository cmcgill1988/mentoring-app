import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { pageRouting } from './pages.routing';
import { SecurePageComponent } from './secure-page/secure-page.component';

@NgModule({
  declarations: [HomePageComponent, SecurePageComponent],
  imports: [
    CommonModule,
    pageRouting
  ],
  exports: [HomePageComponent]
})
export class PagesModule { }
