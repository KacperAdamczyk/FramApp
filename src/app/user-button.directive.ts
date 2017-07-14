import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appUserButton]'
})
export class UserButtonDirective {
  @Input() userLoggedIn: boolean;
  userLoggedInLabel = 'Log Out';
  userLoggedOutLabel = 'Log In';

  constructor(el: ElementRef) {
    console.log(this.userLoggedIn);
    el.nativeElement.innerText = this.userLoggedIn ? this.userLoggedInLabel : this.userLoggedOutLabel;
  }

}
