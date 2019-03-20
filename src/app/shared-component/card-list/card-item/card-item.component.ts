import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../../../data/models/post';
import { UserDisplayComponent } from './../../user-display/user-display.component';
import { fadeAnimation } from '../../../_animations/fade.animation';

@Component({
  selector: 'card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  entryComponents: [UserDisplayComponent],
  animations: [fadeAnimation]
})
export class CardItemComponent implements OnChanges {
  @Input() public item: Post;
  @Input() public currentUser: string;
  @Input() public originNode: string;
  public editing: boolean;
  public selectedItem: string;
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.item = changes.item.currentValue;
      this.currentUser = changes.currentUser.currentValue;
      this.currentUser = changes.currentUser.currentValue;
    }
  }
}
