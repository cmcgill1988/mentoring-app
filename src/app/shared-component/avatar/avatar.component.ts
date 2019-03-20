import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() avatar: string;
  @Input() size: string;
  constructor() { }

  ngOnInit() {
    if (!this.avatar) {
      // tslint:disable-next-line: max-line-length
      this.avatar = 'https://firebasestorage.googleapis.com/v0/b/ng4-template-9fbe1.appspot.com/o/app-assets%2Fplaceholder-thumb.svg?alt=media&token=f4a0883c-b712-4225-bf6e-fe68e1859a87';
    }
  }

  getCssClasses(size: string): any {
    let cssClasses = {};
    switch (size) {
      case 'xxs':
        cssClasses = { 'avatar-img-xxs': true };
        break;
      case 'xs':
        cssClasses = { 'avatar-img-xs': true };
        break;
      case 'sm':
        cssClasses = { 'avatar-img-sm': true };
        break;
      case 'md':
        cssClasses = { 'avatar-img-md': true };
        break;
      case 'lg':
        cssClasses = { 'avatar-img-lg': true };
        break;
      case 'xl':
        cssClasses = { 'avatar-img-xl': true };
        break;
      default:
        cssClasses = { 'avatar-img-sm': true };
    }
    return cssClasses;
  }
}
