import { ActivatedRoute, Router } from '@angular/router';
import { AvatarComponent } from '../../shared-component/avatar/avatar.component';
import { Component, NgZone, OnInit } from '@angular/core';
import { fadeAnimation } from '../../_animations/fade.animation';
import { ModalComponent } from '../../shared-component/modal/modal.component';
import { ModalService } from '../../shared-component/modal/services/modal.service';
import { ToasterService } from 'angular2-toaster';
import { UploadService } from '../../shared-component/uploads/services/upload.service';
import { UserService } from '../../providers/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Upload } from 'src/app/data/models/upload';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  entryComponents: [AvatarComponent, ModalComponent],
  animations: [fadeAnimation],
  providers: [UserService, UploadService, ModalService]
})
export class ProfileComponent implements OnInit {
  user: any;
  oldName: string;
  closeResult: any;
  imgUrl: string;
  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    public userService: UserService,
    public uploadService: UploadService,
    private toasterService: ToasterService,
    public zoneService: NgZone) {
  }
  ngOnInit() {
    this.route.params
      .map(params => params['uid'])
      .switchMap(uid => this.userService.getSingleUserDetails(uid))
      .map(response => {
        this.user = response;
        console.log(this.user);
        this.oldName = this.user.displayName;
      })
      .subscribe();
  }

  editImage(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


  editName(name: string) {
    if (name.length === 0) {
      this.toasterService.pop('error', 'Error', 'Display name must not be empty.');
    } else if (this.oldName !== name) {
      this.userService.updateDisplayName(name).then(() => {
        this.oldName = name;
        this.toasterService.pop('success', 'Success', 'Display name successfully changed');
      }).catch((error) => {
        this.toasterService.pop('error', 'Error', error);
      });
    }
  }

  public uploadDone(upload: Upload): void {
    this.zoneService.run(() => {
      this.user.photoURL = upload.url;
    });
    this.closeModal('profile-pic-upload');
  }
}
