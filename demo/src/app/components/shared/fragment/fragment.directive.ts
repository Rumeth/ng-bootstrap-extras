import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'a[ngbxdFragment]',
  host: {
    '[class.title-fragment]': 'true',
    '[attr.id]': 'fragment'
  }
})
export class NgbxdFragment {
  @Input() fragment: string;
}
