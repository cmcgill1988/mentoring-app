import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  constructor(private afs: AngularFirestore, private authService: AuthService) {
  }

  public async decrementLikes(postKey: string, author: string, likes: number, uid: string, likeNode: string): Promise<void> {
    this.afs.collection('likes').doc('posts').collection(postKey).doc(uid).delete().then(() => {
      return this.afs.collection(likeNode).doc(uid).collection('posts').doc(postKey).update({ likes: likes })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  public async hasLiked(postKey: string, uid: string): Promise<boolean> {
    const document: AngularFirestoreDocument<any> = this.afs.doc('likes/posts/' + postKey + '/' + uid);
    const document$: Observable<any> = document.valueChanges();
    return document$.toPromise();
  }

  public async incrementLikes(postKey: string, author: string, likes: number, uid: string, likeNode: string): Promise<void> {
    console.log('liking');
    this.afs.collection('likes').doc('posts').collection(postKey).doc(uid).set({ uid: uid }).then(() => {
      return this.afs.collection(likeNode).doc(uid).collection('posts').doc(postKey).update({ likes: likes })
        .catch((error) => {
          console.log(error);
        });
    });
  }
}
