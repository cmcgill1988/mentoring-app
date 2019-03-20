import { DisplayItem } from '../../data/models/displayItem';
import { fadeAnimation } from '../../_animations/fade.animation';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'content-display',
  templateUrl: './content-display.component.html',
  styleUrls: ['./content-display.component.scss'],
  animations: [fadeAnimation]
})
export class ContentDisplayComponent implements OnInit {
@Input() content: DisplayItem;
  constructor() { }

  ngOnInit() {
  }

}
