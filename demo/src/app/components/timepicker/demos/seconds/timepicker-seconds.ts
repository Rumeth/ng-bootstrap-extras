import {Component} from '@angular/core';
import {NgbxTimeStruct} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-timepicker-seconds',
  templateUrl: './timepicker-seconds.html'
})
export class NgbxdTimepickerSeconds {
  time: NgbxTimeStruct = {hour: 13, minute: 30, second: 30};
  seconds = true;

  toggleSeconds() {
    this.seconds = !this.seconds;
  }
}
