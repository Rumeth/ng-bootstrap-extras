import {Component, Injectable} from '@angular/core';
import {NgbxDateStruct, NgbxCalendar, NgbxDatepickerI18n, NgbxCalendarPersian} from 'ng-bootstrap-extras';

const WEEKDAYS_SHORT = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];
const MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

@Injectable()
export class NgbxDatepickerI18nPersian extends NgbxDatepickerI18n {
  getWeekdayShortName(weekday: number) { return WEEKDAYS_SHORT[weekday - 1]; }
  getMonthShortName(month: number) { return MONTHS[month - 1]; }
  getMonthFullName(month: number) { return MONTHS[month - 1]; }
  getDayAriaLabel(date: NgbxDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}

@Component({
  selector: 'ngbxd-datepicker-jalali',
  templateUrl: './datepicker-jalali.html',
  providers: [
    {provide: NgbxCalendar, useClass: NgbxCalendarPersian},
    {provide: NgbxDatepickerI18n, useClass: NgbxDatepickerI18nPersian}
  ]
})
export class NgbxdDatepickerJalali {

  model: NgbxDateStruct;
  date: {year: number, month: number};

  constructor(private calendar: NgbxCalendar) {
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
