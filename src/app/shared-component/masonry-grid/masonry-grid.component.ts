import { fadeDropAnimation } from '../../_animations/index';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MasonryGridItemComponent } from './masonry-grid-item/masonry-grid-item.component';

@Component({
  selector: 'masonry-grid',
  templateUrl: './masonry-grid.component.html',
  styleUrls: ['./masonry-grid.component.scss'],
  animations: [fadeDropAnimation],
  entryComponents: [MasonryGridItemComponent]
})
export class MasonryGridComponent implements OnChanges {
  @Input() public items: any;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.items = changes.items.currentValue;
    }
  }

}
