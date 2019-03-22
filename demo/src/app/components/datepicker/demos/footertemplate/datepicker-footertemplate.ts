import {Component} from '@angular/core';
import {NgbxCalendar, NgbxDateStruct} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-datepicker-footertemplate',
  templateUrl: './datepicker-footertemplate.html',
})
export class NgbxdDatepickerFootertemplate {
  model: NgbxDateStruct;
  today = this.calendar.getToday();

  constructor(private calendar: NgbxCalendar) {}
}
