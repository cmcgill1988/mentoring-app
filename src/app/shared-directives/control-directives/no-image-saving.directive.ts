import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[noImageSaving]'
})
export class NoImageSavingDirective {

  constructor() { }
  @HostListener('contextmenu', ['$event'])
  onDocumentRightClick(event) {
    event.preventDefault();
  }

  @HostListener('dragstart', ['$event'])
  onDocumentDrag(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
