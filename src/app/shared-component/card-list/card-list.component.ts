import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { User } from '../../data/models/user';
import { CardItemComponent } from './card-item/card-item.component';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  entryComponents: [CardItemComponent]
})
export class CardListComponent implements OnInit, OnChanges {
  @Input() public items: any[];
  @Input() public searchEnabled: boolean = false;
  @Input() public originNode: string;

  public filteredItems: any[];
  public currentUser: User;
  constructor(public authService: AuthService) { }

  public ngOnInit(): void {
    this.filteredItems = this.items;
    this.authService.user$.subscribe((response) => {
      this.currentUser = response;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.filteredItems = this.items;
    }
  }

  public filterItems(searchVal: string) {
    this.filteredItems = this.items.filter(item => {
      return item.title.includes(searchVal) && item.summary.includes(searchVal);
    });
  }

}
