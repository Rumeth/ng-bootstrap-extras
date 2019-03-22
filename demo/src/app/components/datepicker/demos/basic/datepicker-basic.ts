import {Component} from '@angular/core';
import {NgbxDateStruct, NgbxCalendar} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-datepicker-basic',
  templateUrl: './datepicker-basic.html'
})
export class NgbxdDatepickerBasic {

  model: NgbxDateStruct;
  date: {year: number, month: number};

  constructor(private calendar: NgbxCalendar) {
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
