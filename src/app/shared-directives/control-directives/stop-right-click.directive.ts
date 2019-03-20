import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[stopRightClick]'
})
export class StopRightClickDirective {

  constructor() { }
  @HostListener('contextmenu', ['$event'])
  onDocumentRightClick(event) {
      event.preventDefault();
  }
}
