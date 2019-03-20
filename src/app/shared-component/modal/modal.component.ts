import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

import { ModalService } from './services/modal.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'modal',
  template: '<ng-content></ng-content>'
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: $;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = $(el.nativeElement);
  }

  ngOnInit(): void {
    let modal = this;

    if (!this.id) {
      return;
    }
    this.element.appendTo('body');

    this.element.on('click', function (e: any) {
      var target = $(e.target);
      if (!target.closest('.modal-body').length) {
        modal.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.show();
    $('body').addClass('modal-open');
  }

  close(): void {
    this.element.hide();
    $('body').removeClass('modal-open');
  }
}
