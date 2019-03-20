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

    login(credentials: UserCredentials) {
        const promise = new Promise((resolve, reject) => {
            this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        });
        return promise;
    }

    logout() {
        const promise = new Promise((resolve, reject) => {
            this.afireauth.auth.signOut().then(() => {
                resolve(true);
            }).catch((err) => reject(err));
        });
        return promise;
    }

}