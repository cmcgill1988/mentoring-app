import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private auth: AuthenticationService) {

  }
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    try {
      const user = this.getCurrentUser();
      return !!user;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  private async getCurrentUser(): Promise<firebase.User> {
    return await this.auth.getUser();
  }
}
