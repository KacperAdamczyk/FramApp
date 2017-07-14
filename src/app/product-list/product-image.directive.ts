import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appProductImage]'
})
export class ProductImageDirective {
  @Input() url: string;
  constructor(el: ElementRef) {
    console.log(this.url);
    el.nativeElement.style.backgroundImage = this.url;
  }
}
