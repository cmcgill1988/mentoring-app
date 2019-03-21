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
    lo.each(filesIndex, async (idx) => {
      this.currentUpload = new Upload(fileList[idx]);
      switch (this.uploadType) {
        case 'profile':
          await this.uploadHandler(this.upSvc.pushProfileUpload(this.currentUpload), idx);
          break;
        default:
          await this.uploadHandler(this.upSvc.pushUpload(this.currentUpload), idx);
          break;
      }
    });
  }

  private async uploadHandler(promise: Promise<Upload | void>, idx: number): Promise<void> {
    try {
      const uploadResponse = await promise;
      console.log('uploadResponse', uploadResponse);

      this.uploadList.push(uploadResponse);
      if (idx === this.selectedFiles.length - 1) {
        this.uploadDone.emit(this.uploadList[idx]);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
