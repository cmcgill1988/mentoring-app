import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hover-lift]'
})
export class HoverLiftDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event) {
    this.renderer.addClass(this.el.nativeElement, 'hvr-float');
  }
  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event) {
    this.renderer.removeClass(this.el.nativeElement, 'hvr-float');
  }
}