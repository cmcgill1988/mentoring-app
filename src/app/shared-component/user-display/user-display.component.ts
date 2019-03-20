import { User } from '../../data/models/user';
import { UserService } from '../../providers/user.service';
import { AvatarComponent } from './../avatar/avatar.component';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss'],
  entryComponents: [AvatarComponent],
  providers: [UserService]
})
export class UserDisplayComponent implements OnInit, OnChanges {
  @Input() public uid: string;
  @Input() public avatarSize: string;
  public user: User;
  constructor(private userService: UserService) { }

  public async ngOnInit(): Promise<void> {
    try {
      this.user = await this.userService.getSingleUserDetails(this.uid);
    } catch (error) {
      console.log(error);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.uid) {
      this.uid = changes.uid.currentValue;
    }
    if (changes.avatarSize) {
      this.avatarSize = changes.avatarSize.currentValue;
    }
  }

}
