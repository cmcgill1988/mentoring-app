import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

import { ModalService } from './services/modal.service';

@Component({
  selector: 'modal-window',
  template: '<ng-content></ng-content>'
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() private id: string;
  private element: $;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = $(el.nativeElement);
  }

  public ngOnInit(): void {
    const modal = this;

    if (!this.id) {
      return;
    }
    this.element.appendTo('body');

    this.element.on('click', function (e: any) {
      const target = $(e.target);
      if (!target.closest('.modal-body').length) {
        modal.close();
      }
    });

    this.modalService.add(this);
  }

  public ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  public open(): void {
    this.element.show();
    $('body').addClass('modal-open');
  }

  public close(): void {
    this.element.hide();
    $('body').removeClass('modal-open');
  }
}
