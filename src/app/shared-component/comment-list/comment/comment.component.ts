import { ToasterService } from 'angular2-toaster';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { CommentService } from './../services/comment.service';

import { Comment } from '../../../data/models/comment';
import { User } from '../../../data/models/user';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [CommentService]
})
export class CommentComponent implements OnInit {
  @Input() parent: any;
  @Input() commentNode: string;
  comment: Comment = new Comment();
  currentUser: User;
  constructor(public authService: AuthService, private commentService: CommentService, private toastService: ToasterService) { }

  public ngOnInit(): void {
    this.authService.user$.subscribe((response) => {
      this.currentUser = response;
      this.comment = this.resetComment();
    });
  }

  public resetComment(): Comment {
    return new Comment('', this.parent.id, '', '', 0, 0, this.commentNode);
  }

  public async saveComment(comment: Comment, parentCommentCount: number): Promise<void> {
    if (comment && comment.content) {
      try {
        comment.author = this.currentUser.uid;
        await this.commentService.addComment(comment, this.parent.author, parentCommentCount + 1);
        this.comment = this.resetComment();
        this.toastService.pop('success', 'Success', 'Your comment has been added.');
      } catch (error) {
        console.log(error);
        this.toastService.pop('error', 'Error', 'Failed to add comment: ' + error);
      }
    } else {
      this.toastService.pop('error', 'Error', 'Leave a comment before trying to save.');
    }
  }
}
