import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbProvider {

  constructor(private afs: AngularFirestore) {
  }

  /**
   * 
   * @param path path to firestore collection 
   * @param query query for firestore collection
   * 
   * Gets a specific firestore collection using an optional query param
   */
  public collection$(path: string, query?): Observable<any> {
    return this.afs
      .collection(path, query)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data: Object = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
  /**
   * 
   * @param path path to firestore document
   * 
   * Gets a specific firestore document
   */
  public doc$(path: string): Observable<any> {
    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id }
        })
      );
  }

  /**
   * 
   * @param path 'collection' or 'collection/docID' 
   * @param data new data 
   * 
   * Creates or updates data (non-destructive) on a collection or document
   */
  public updateAt(path: string, data: Object): Promise<any> {
    const segments = path.split('/').filter(v => v);
    if (segments.length % 2) {
      // odd always a collection
      return this.afs.collection(path).add(data);
    } else {
      // even always a doc
      return this.afs.doc(path).set(data, { merge: true });
    }
  }

  /**
   * 
   * @param path path to firestore document 
   * 
   * Deletes a specific firestore document
   */
  public delete(path: string): Promise<void> {
    return this.afs.doc(path).delete();
  }
}
