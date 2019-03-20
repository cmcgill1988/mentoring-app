import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AuthService } from '../../providers/auth.service';
import { CommentService } from './services/comment.service';
import { UserService } from '../../providers/user.service';
import { User } from '../../data/models/user';
import { fadeAnimation } from '../../_animations/fade.animation';
import { CommentControlsComponent } from './comment-controls/comment-controls.component';
import { CommentComponent } from './comment/comment.component';
import { UserDisplayComponent } from './../user-display/user-display.component';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  entryComponents: [CommentComponent, CommentControlsComponent, UserDisplayComponent],
  providers: [CommentService, UserService],
  animations: [fadeAnimation]
})
export class CommentListComponent implements OnInit, OnChanges {
  @Input() public parent: any;
  @Input() public commentNode: string;
  public currentUser: User;
  public comments: any;
  constructor(public authService: AuthService, public commentService: CommentService) {}

  public ngOnInit(): void {
    this.authService.user$.subscribe((response) => {
      this.currentUser = response;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.parent = changes.parent.currentValue;
      this.commentNode = changes.commentNode.currentValue;
      this.comments = this.commentService.getComments(this.parent.id);
    }
  }

}
