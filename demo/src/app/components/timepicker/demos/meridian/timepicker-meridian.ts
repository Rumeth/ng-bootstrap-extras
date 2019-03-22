import {Component} from '@angular/core';

@Component({
  selector: 'ngbxd-timepicker-meridian',
  templateUrl: './timepicker-meridian.html'
})
export class NgbxdTimepickerMeridian {
  time = {hour: 13, minute: 30};
  meridian = true;

  toggleMeridian() {
      this.meridian = !this.meridian;
  }
}
