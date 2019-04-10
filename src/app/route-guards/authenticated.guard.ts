import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router) {

  }
  public canActivate(): Observable<boolean>|boolean {
    return this.auth.authState.map(user => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['admin/login']);
        return false;
      }
    });
  }
}
