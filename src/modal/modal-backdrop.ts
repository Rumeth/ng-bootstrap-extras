import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngbx-modal-backdrop',
  template: '',
  host:
      {'[class]': '"modal-backdrop fade show" + (backdropClass ? " " + backdropClass : "")', 'style': 'z-index: 1050'}
})
export class NgbxModalBackdrop {
  @Input() backdropClass: string;
}
