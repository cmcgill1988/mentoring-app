import { User } from './../data/models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;
  constructor(public afireauth: AngularFireAuth, public afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users');
    this.users$ = this.usersCollection.valueChanges();
  }

  public async addUser(newUser): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newUser.displayName,
          photoURL: ''
        }).then(() => {
          this.usersCollection.doc(this.afireauth.auth.currentUser.uid).set({
            $key: this.afireauth.auth.currentUser.uid,
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newUser.displayName,
            photoURL: ''
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  public async passwordReset(email: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.afireauth.auth.sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  public async updateImage(imageUrl: string): Promise<any> {
    try {
      await this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: imageUrl
      });
      await  this.afs.doc<User>(`users/${this.afireauth.auth.currentUser.uid}`).update({
        photoURL: imageUrl
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async getSingleUserDetails(uid: string): Promise<any> {
    let userObj;
    const promise = new Promise((resolve, reject) => {
      this.afs.collection('users').doc(uid).valueChanges().subscribe((data) => {
        userObj = data;
        resolve(data);
      });
    });
    return promise;
  }

  public updateDisplayName(newName: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: newName,
        photoURL: this.afireauth.auth.currentUser.photoURL
      }).then(() => {
        this.afs.doc<User>(`users/${this.afireauth.auth.currentUser.uid}`).update({
          displayName: newName
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  public async getAllUsers(): Promise<Subscription> {
    return this.afs.collection<User>('users').valueChanges().subscribe();
  }
}
