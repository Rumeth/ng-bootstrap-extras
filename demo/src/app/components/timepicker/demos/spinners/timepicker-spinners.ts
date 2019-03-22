import {Component} from '@angular/core';

@Component({
  selector: 'ngbxd-timepicker-spinners',
  templateUrl: './timepicker-spinners.html'
})
export class NgbxdTimepickerSpinners {
  time = {hour: 13, minute: 30};
  spinners = true;

  toggleSpinners() {
      this.spinners = !this.spinners;
  }
}
