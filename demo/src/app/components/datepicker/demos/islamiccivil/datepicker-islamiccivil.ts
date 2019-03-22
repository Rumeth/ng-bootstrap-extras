import {Component, Injectable} from '@angular/core';
import {
  NgbxDateStruct, NgbxCalendar, NgbxCalendarIslamicCivil, NgbxDatepickerI18n
} from 'ng-bootstrap-extras';

const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
  'ذو القعدة', 'ذو الحجة'];

@Injectable()
export class IslamicI18n extends NgbxDatepickerI18n {

  getWeekdayShortName(weekday: number) {
    return WEEKDAYS[weekday - 1];
  }

  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getDayAriaLabel(date: NgbxDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'ngbxd-datepicker-islamiccivil',
  templateUrl: './datepicker-islamiccivil.html',
  providers: [
    {provide: NgbxCalendar, useClass: NgbxCalendarIslamicCivil},
    {provide: NgbxDatepickerI18n, useClass: IslamicI18n}
  ]
})
export class NgbxdDatepickerIslamiccivil {

  model: NgbxDateStruct;

  constructor(private calendar: NgbxCalendar) {}

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
