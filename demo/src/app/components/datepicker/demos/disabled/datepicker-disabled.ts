import {Component} from '@angular/core';
import {NgbxCalendar, NgbxDateStruct} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-datepicker-disabled',
  templateUrl: './datepicker-disabled.html'
})
export class NgbxdDatepickerDisabled {

  model: NgbxDateStruct;
  disabled = true;

  constructor(calendar: NgbxCalendar) {
    this.model = calendar.getToday();
  }
}
