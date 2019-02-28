import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { actionCodeSettings } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: any;

  constructor(public afAuth: AngularFireAuth, private router: Router, private toastr: ToastrService) {
    this.getUser();
  }

  private async getUser(): Promise<void> {
    this.user = await this.afAuth.authState.toPromise();
  }

  public async sendEmailLink(email: string): Promise<void> {
    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        email,
        actionCodeSettings
      );
      console.log('user', this.user);
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
  }

  public isSignedIn(url: string): boolean {
    this.getUser();
    return this.afAuth.auth.isSignInWithEmailLink(url);
  }
}
