import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedGuard } from './authenticated.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AuthenticatedGuard]
})
export class RouteGuardModule { }
