import {Component} from '@angular/core';
import {NgbxTimeStruct} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-timepicker-steps',
  templateUrl: './timepicker-steps.html'
})
export class NgbxdTimepickerSteps {
  time: NgbxTimeStruct = {hour: 13, minute: 30, second: 0};
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;
}
