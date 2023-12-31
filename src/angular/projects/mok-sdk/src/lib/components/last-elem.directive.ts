import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[lastElem]'
})
export class LastElemDirective {
  @Input() lastElem: boolean = false;

  constructor(private el: ElementRef) {}
  ngOnChanges() {
    if (this.el.nativeElement && this.el.nativeElement.classList) {
      if (this.lastElem) {
        this.el.nativeElement.classList.add('last-elem');
      } else {
        this.el.nativeElement.classList.remove('last-elem');
      }
    }
  }
}
