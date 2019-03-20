import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Comment } from '../../../data/models/comment';
import { Observable } from 'rxjs';

@Injectable()
export class CommentService {
  constructor(private afs: AngularFirestore, ) {
  }

  public async addComment(comment: Comment, postAuthor: string, comments: number): Promise<void> {
    try {
      await this.afs.collection('comments').doc(comment.parentPost).collection('comments').add({
        ...comment,
        ...{ timeStamp: firebase.database.ServerValue.TIMESTAMP }
      });

      await this.afs.collection(comment.commentNode)
      .doc(postAuthor)
      .collection('posts')
      .doc(comment.parentPost)
      .update({ comments: comments });
    } catch (error) {
      console.log(error);
    }
  }

  public getComments(parentId: string): Observable<firebase.firestore.DocumentData[]> {
    return this.afs.collection<Comment>('comments')
    .doc(parentId)
    .collection('comments', ref => ref.orderBy('dateAdded', 'asc'))
    .valueChanges();
  }
}
