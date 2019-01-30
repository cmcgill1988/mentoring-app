import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { pageRouting } from './pages.routing';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    pageRouting
  ],
  exports: [HomePageComponent]
})
export class PagesModule { }
