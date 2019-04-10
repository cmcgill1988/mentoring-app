import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { actionCodeSettings } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../providers/user.service';
import { User } from '../data/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isCurrentUserAdmin: boolean;

  constructor(public afAuth: AngularFireAuth, private router: Router, private toastr: ToastrService, public userService: UserService) {
    this.isAdmin();
  }

  public async getUser(): Promise<firebase.User> {
    return await this.afAuth.authState.toPromise();
  }

  public async sendEmailLink(email: string): Promise<void> {
    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        email,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', email);
      this.toastr.success('You will receive a sign in link in an email, click it to sign in');
    } catch (err) {
      console.log(err);
      this.toastr.error('Sign in failed');

    }
  }

  public async logout(): Promise<void> {
    try {
      await this.afAuth.auth.signOut();
      this.toastr.success('Signed out successfully');

    } catch (err) {
      console.log(err);
      this.toastr.error('Sign out failed');
    }
    this.isAdmin();
  }

  public isSignedIn(url: string): boolean {
    this.getUser();
    return this.afAuth.auth.isSignInWithEmailLink(url);
  }

  public async isAdmin(): Promise<boolean> {
    try {
      const currentUser = await this.afAuth.user.toPromise();
      this.isCurrentUserAdmin =  await this.userService.getSingleUserDetails(currentUser.uid).then((details: User) => details.isAdmin);
      console.log('IS USER ADMIN', this.isCurrentUserAdmin);
    } catch (err) {
      return false;
    }
  }
}
