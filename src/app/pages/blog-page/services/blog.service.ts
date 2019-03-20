import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './../../../providers/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/RX';
import { Post } from './../../../data/models/post';

@Injectable()
export class BlogService {
  constructor(private afs: AngularFirestore) { }

  public async getAllBlogPosts() {
    return await this.afs.collection<Post>('blog').snapshotChanges().subscribe();
  }

  public async getUserBlogPosts(uid: string) {
    const blogRef = await this.afs.collection<Post>('blog')
      .doc(uid)
      .collection('posts', ref => ref.where('author', '==', uid)
        .orderBy('timeStamp', 'desc'));
    return blogRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Post;
        const id = action.payload.doc.id;
        return { id, data };
      });
    });
  }

  public async addBlogPost(uid: string, item: Post): Promise<void> {
    try {
      const currentDate = new Date();
      item.dateAdded = currentDate.toISOString();
      await this.afs
        .collection('blog')
        .doc(uid)
        .collection('posts')
        .add({ ...item, ...{ timeStamp: firebase.database.ServerValue.TIMESTAMP } });
    } catch (error) {
      console.log(error);
    }
  }

  public async decrementLikes(postKey: string, author: string, likes: number, uid: any): Promise<void> {
    try {
      await this.afs.collection('likes').doc('posts').collection(postKey).doc(uid).delete();
      await this.afs.collection('blog').doc(uid).collection('posts').doc(postKey).update({ likes: likes });
    } catch (error) {
      console.error(error);
    }
  }

  public hasLiked(postKey: string, uid: string) {
    const document: AngularFirestoreDocument<any> = this.afs.doc('likes/posts/' + postKey + '/' + uid);
    const document$: Observable<any> = document.valueChanges();
    return document$;
  }

  public async incrementLikes(postKey: string, author: string, likes: number, uid: any): Promise<void> {
    try {
      await this.afs.collection('likes').doc('posts').collection(postKey).doc(uid).set({ uid: uid });
      await this.afs.collection('blog').doc(uid).collection('posts').doc(postKey).update({ likes: likes });
    } catch (error) {
      console.error(error);
    }
  }

  public async removeItem($key: string, uid: string): Promise<void> {
    try {
      await this.afs.doc<any>(`likes/${uid}/${$key}`).delete();
      await this.afs.doc(`comments/${$key}`).delete();
      await this.afs.doc(`blogItems/${$key}`).delete();
    } catch (error) {
      console.error(error);
    }
  }
}
