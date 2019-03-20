import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../providers/user.service';
import { UploadService } from './services/upload.service';
import { Upload } from '../../data/models/upload';
import * as lo from 'lodash';

@Component({
  selector: 'upload-form',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss'],
  providers: [UploadService, UserService]
})
export class UploadsComponent {
  @Input() public uploadType: string;
  @Output() public currentUpload: Upload;
  @Output() public uploadDone = new EventEmitter<any[]>();
  public uploadList: any = [];
  public dropZoneActive: boolean;
  public selectedFiles: FileList;
  constructor(private upSvc: UploadService) {
    this.dropZoneActive = false;
   }

  public detectFiles(event): void {
    this.handleDrop(event.target.files);
  }

  public dropZoneState($event: boolean): void {
    this.dropZoneActive = $event;
  }

  public handleDrop(fileList: FileList): void {
    this.selectedFiles = fileList;
    const filesIndex = lo.range(fileList.length);
    lo.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(fileList[idx]);
      switch (this.uploadType) {
        case 'profile':
          this.upSvc.pushProfileUpload(this.currentUpload).then((response) => {
            this.uploadList.push(response);
            if (idx === fileList.length - 1) {
              this.uploadDone.emit(this.uploadList);
              this.currentUpload = undefined;
            }
          }).catch((error) => {
            console.log(error);
          });
          break;
        default:
          this.upSvc.pushUpload(this.currentUpload).then((response) => {
            this.uploadList.push(response);
            if (idx === fileList.length - 1) {
              this.uploadDone.emit(this.uploadList);
            }
          }).catch((error) => {
            console.log(error);
          });
      }
    });
  }
}
