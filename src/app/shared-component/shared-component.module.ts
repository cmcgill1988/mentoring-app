import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedDirectivesModule } from './../shared-directives/shared-directives.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AvatarComponent } from './avatar/avatar.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardItemComponent } from './card-list/card-item/card-item.component';
import { CardItemPostControlsComponent } from './card-list/card-item-post-controls/card-item-post-controls.component';
import { CommentComponent } from './comment-list/comment/comment.component';
import { CommentControlsComponent } from './comment-list/comment-controls/comment-controls.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { ContentDisplayComponent } from './content-display/content-display.component';
import { MasonryGridComponent } from './masonry-grid/masonry-grid.component';
import { MasonryGridItemComponent } from './masonry-grid/masonry-grid-item/masonry-grid-item.component';
import { ModalComponent } from './modal/modal.component';
import { UploadsComponent } from './uploads/uploads.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { FileDropDirective } from './uploads/directives/file-drop.directive';
import { ExpandingGridItemComponent } from './expanding-grid-item/expanding-grid-item.component';

@NgModule({
  imports: [CollapseModule, CommonModule, FormsModule, RouterModule, SharedDirectivesModule, NgbModule.forRoot()],
  declarations: [
    NavbarComponent,
    AvatarComponent,
    CardItemComponent,
    CardItemPostControlsComponent,
    CardListComponent,
    CommentComponent,
    CommentControlsComponent,
    CommentListComponent,
    ContentDisplayComponent,
    MasonryGridComponent,
    MasonryGridItemComponent,
    ModalComponent,
    UploadsComponent,
    UserDisplayComponent,
    FileDropDirective,
    ExpandingGridItemComponent
],
  exports: [
    CommonModule,
    FormsModule,
    AvatarComponent,
    CardItemComponent,
    CardItemPostControlsComponent,
    CardListComponent,
    CommentComponent,
    CommentControlsComponent,
    CommentListComponent,
    ContentDisplayComponent,
    ExpandingGridItemComponent,
    NavbarComponent,
    MasonryGridComponent,
    MasonryGridItemComponent,
    ModalComponent,
    UploadsComponent,
    UserDisplayComponent
  ]
})
export class SharedComponentModule { }