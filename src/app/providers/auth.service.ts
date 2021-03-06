import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserCredentials } from '../data/interfaces/usercredentials';
import { UserService } from './user.service';
import { User } from '../data/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user$: Observable<any>;
    isCurrentUserAdmin: boolean;
    loginStateChange$: EventEmitter<any>;

    constructor(public afireauth: AngularFireAuth, private userService: UserService, private router: Router) {
        this.loginStateChange$ = new EventEmitter();
        this.user$ = this.afireauth.authState;
        this.user$.subscribe((response) => {
          this.loginStateChange$.emit(response);
          if (response && response.uid) {
            this.userService.getSingleUserDetails(response.uid).then((details: User) => this.isCurrentUserAdmin = details.isAdmin);
          }
        });
    }

    public async login(credentials: UserCredentials): Promise<void> {
      await this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    public async logout(): Promise<void> {
      try {
        this.router.navigate(['home']);
        await this.afireauth.auth.signOut();
        this.isCurrentUserAdmin = false;
      } catch (error) {
        console.error(error);
      }
    }
}
