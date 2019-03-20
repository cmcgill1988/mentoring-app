import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BlogService } from '../../../pages/blog-page/services/blog.service';

@Component({
  selector: 'card-item-post-controls',
  templateUrl: './card-item-post-controls.component.html',
  styleUrls: ['./card-item-post-controls.component.scss']
})
export class CardItemPostControlsComponent implements OnChanges {
  @Input() uid: string;
  @Input() postAuthor: string;
  @Input() postId: string;
  constructor(private blogService: BlogService) { }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.uid) {
      this.uid = changes.uid.currentValue;
    }
    if (changes.postAuthor) {
      this.postAuthor = changes.postAuthor.currentValue;
    }

    if (changes.postId) {
      this.postId = changes.postId.currentValue;
    }
  }
  public canShow(): boolean {
    return this.postAuthor === this.uid;
  }

  public async removePost(): Promise<void> {
    try {
      await this.blogService.removeItem(this.postId, this.postAuthor);
    } catch (err) {
      throw err;
    }
  }
}
