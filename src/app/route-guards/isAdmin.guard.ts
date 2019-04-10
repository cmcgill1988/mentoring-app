import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(): boolean {
    const isAdmin = this.authService.isCurrentUserAdmin;
    console.log('isAdmin', isAdmin);
    if (isAdmin) {
      return isAdmin;
    } else {
      this.router.navigate(['error']);
      return false;
    }
  }
}
