import {Directive} from '@angular/core';

@Directive({
  selector: '[ngbxButtonLabel]',
  host:
      {'[class.btn]': 'true', '[class.active]': 'active', '[class.disabled]': 'disabled', '[class.focus]': 'focused'}
})
export class NgbxButtonLabel {
  active: boolean;
  disabled: boolean;
  focused: boolean;
}
