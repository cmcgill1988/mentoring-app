import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedGuard } from './authenticated.guard';
import { IsAdminGuard } from './isAdmin.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AuthenticatedGuard, IsAdminGuard]
})
export class RouteGuardModule { }
