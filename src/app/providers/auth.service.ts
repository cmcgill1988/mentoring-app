import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserCredentials } from '../data/interfaces/usercredentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user$: Observable<any>;
    loginStateChange$: EventEmitter<any>;

    constructor(public afireauth: AngularFireAuth) {
        this.loginStateChange$ = new EventEmitter();
        this.user$ = this.afireauth.authState;
        this.user$.subscribe((response) => this.loginStateChange$.emit(response));
    }

    public async login(credentials: UserCredentials): Promise<void> {
      await this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    public async logout(): Promise<void> {
      try {
        await this.afireauth.auth.signOut();
      } catch (error) {
        console.error(error);
      }
    }
}
