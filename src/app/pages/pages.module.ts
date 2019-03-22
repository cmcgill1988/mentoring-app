import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { pageRouting } from './pages.routing';
import { SecurePageComponent } from './secure-page/secure-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { CanvasPageComponent } from './canvas-page/canvas-page.component';
import { SharedComponentModule } from '../shared-component/shared-component.module';
import { SharedDirectivesModule } from '../shared-directives/shared-directives.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MasonryPageComponent } from './masonry-page/masonry-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SecurePageComponent,
    AboutPageComponent,
    BlogPageComponent,
    CanvasPageComponent,
    MasonryPageComponent,
    ErrorPageComponent],
  imports: [
    CommonModule,
    pageRouting,
    SharedComponentModule,
    SharedDirectivesModule
  ],
  exports: [HomePageComponent]
})
export class PagesModule { }
