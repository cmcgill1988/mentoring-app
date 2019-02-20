import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbProvider } from './db.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [DbProvider]
})
export class CoreModule { }
