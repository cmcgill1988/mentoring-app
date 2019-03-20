import { fadeAnimation } from '../../../_animations/index';
import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { UserDisplayComponent } from './../../user-display/user-display.component';

@Component({
  selector: 'masonry-grid-item',
  templateUrl: './masonry-grid-item.component.html',
  styleUrls: ['./masonry-grid-item.component.scss'],
  entryComponents: [UserDisplayComponent],
  animations: [fadeAnimation]
})
export class MasonryGridItemComponent implements OnChanges {
  @Input() item: any;
  @Input() itemType: any;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.item = changes.item.currentValue;
    }

    if (changes.itemType) {
      this.itemType = changes.itemType.currentValue;
    }
  }

}
