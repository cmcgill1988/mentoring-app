import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Upload } from '../../../data/models/upload';
import { UserService } from '../../../providers/user.service';
import 'firebase/storage';

@Injectable()
export class UploadService {
  public uploads: AngularFirestoreCollection<Upload>;

  constructor(private afs: AngularFirestore, private af: AngularFireAuth, public userService: UserService) { }

  public async deleteUpload(upload: Upload): Promise<void> {
    try {
      await this.deleteFileData(upload.$key);
      await this.deleteFileStorage(upload.name);
    } catch (error) {
      console.error(error);
    }
  }

  public getUploads() {
    return this.afs.collection<Upload>('uploads').valueChanges().subscribe();
  }

  public async pushUpload(upload: Upload): Promise<void> {
    const storageRef = firebase.storage().ref();
    const dateIdent = new Date();
    const uploadTask = storageRef.child(`uploads/${this.af.auth.currentUser.uid}/${upload.file.name}_${dateIdent}`).put(upload.file);
    try {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      });
    } catch (error) {
      console.error(error);
    } finally {
      upload.url = uploadTask.snapshot.downloadURL;
      upload.name = upload.file.name;
      await this.saveFileData(upload);
    }
  }

  public async pushProfileUpload(upload: Upload): Promise<void> {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`profiles/${this.af.auth.currentUser.uid}/${this.af.auth.currentUser.uid}`).put(upload.file);
    try {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      });
    } catch (error) {
      console.error(error);
    } finally {
      upload.url = uploadTask.snapshot.downloadURL;
      upload.name = upload.file.name;
      await this.saveFileData(upload);
      await this.userService.updateImage(upload.url);
    }
  }


  private deleteFileData(key: string) {
    return this.afs.collection('uploads').doc(key).delete();
  }

  private async deleteFileStorage(name: string): Promise<void> {
    try {
      await firebase.storage().ref().child(`uploads/${name}`).delete();
    } catch (error) {
      console.error(error);
    }
  }

  private async saveFileData(upload: Upload): Promise<void> {
    try {
      await this.afs.collection('uploads').add({ name: upload.name, url: upload.url, uid: this.af.auth.currentUser.uid });
    } catch (error) {
      console.error(error);
    }
  }
}
