import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'ngbxd-rating-form',
  templateUrl: './rating-form.html'
})
export class NgbxdRatingForm {
  ctrl = new FormControl(null, Validators.required);

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }
}
