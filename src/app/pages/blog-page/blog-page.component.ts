import * as _ from 'underscore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { BlogService } from './services/blog.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { fadeAnimation } from '../../_animations/index';
import { LikesService } from './../../providers/likes.service';
import { Post } from './../../data/models/post';
import { UploadsComponent } from '../../shared-component/uploads/uploads.component';
import { UploadService } from '../../shared-component/uploads/services/upload.service';
import { UserDisplayComponent } from '../../shared-component/user-display/user-display.component';

@Component({
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
  providers: [BlogService, UploadService],
  animations: [fadeAnimation],
  entryComponents: [UploadsComponent, UserDisplayComponent]
})
export class BlogPageComponent implements OnInit {
  posts: any;
  currentUser: any;
  authorId: any;
  currentItem: Post;
  showPostControls: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private blogService: BlogService,
    private likesService: LikesService,
    public zoneService: NgZone) {
    this.authService.user$.subscribe((response) => {
      this.currentUser = response;
      this.currentItem = this.resetCurrentItem();
      if (response) {
        this.currentItem.author = this.currentUser.uid;
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    try {
      const params = await this.route.params.toPromise;
      const userBlogPosts = await this.blogService.getUserBlogPosts(params['uid']);
      const remappedUserBlogPosts = userBlogPosts.map((item: any) => {
        return {
          id: item.id,
          author: item.data.author,
          comments: item.data.comments,
          content: item.data.content,
          dateAdded: item.data.dateAdded,
          imgUrl: item.data.imgUrl,
          likes: item.data.likes,
          summary: item.data.summary,
          timeStamp: item.data.timeStamp,
          title: item.data.title,
        };
      });
      this.posts = remappedUserBlogPosts;
    } catch (error) {
      console.error(error);
    }

  }

  public async addItem(post: Post): Promise<void> {
    try {
      await this.blogService.addBlogPost(post.author, post);
      this.currentItem = this.resetCurrentItem();
      this.showPostControls = false;
    } catch (error) {
      console.log(error);
    }
  }

  public async addLike(likes: number, author: string, $key: string, uid: string): Promise<void> {
    try {
      await this.likesService.incrementLikes($key, author, likes, uid, 'blog');
      likes++;
    } catch (error) {
      console.log(error);
    }
  }

  public async hasLiked(postKey: string, uid: string): Promise<boolean> {
    try {
      const hasLiked = await this.likesService.hasLiked(postKey, uid);
      return hasLiked;
    } catch (error) {
      console.log(error);
    }
  }

  public canPost(): boolean {
    if (!this.currentItem.title || !this.currentItem.content || !this.currentItem.summary || !this.currentItem.imgUrl) {
      return false;
    } else {
      return true;
    }
  }

  public async removeLike(likes: number, author: string, $key: string, uid: string): Promise<void> {
    try {
      await this.likesService.decrementLikes($key, author, likes, uid, 'blog');
      likes--;
    } catch (error) {
      console.log(error);
    }
  }

  public async removePost($key: string, uid: string): Promise<void> {
    try {
      await this.blogService.removeItem($key, uid);
    } catch (error) {
      console.log(error);
    }
    this.blogService.removeItem($key, uid);
  }

  public uploadDone(uploadArray: any[]): void {
    const  uploadIdx = uploadArray.length - 1;
    this.zoneService.run(() => {
      this.currentItem.imgUrl = uploadArray[uploadIdx].url;
    });
  }

  private resetCurrentItem(): Post {
    return new Post();
  }
}
