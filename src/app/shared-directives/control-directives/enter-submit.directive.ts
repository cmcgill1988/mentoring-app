import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[enterSubmit]'
})
export class EnterSubmitDirective {
  @Output() enterPressed = new EventEmitter<any>();

  constructor() { }
  @HostListener('document:keypress', ['$event'])
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.enterPressed.emit(true);
    }
  }
}
