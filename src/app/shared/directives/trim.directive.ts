import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[trimOnChange]',
})
export class TrimOnChangeDirective {
  constructor(private el: ElementRef) {}

  @HostListener('change') onChange() {
    const value = this.el.nativeElement.value;
    this.el.nativeElement.value = value.trim();
  }
}
