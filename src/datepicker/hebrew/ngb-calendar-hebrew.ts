import {NgbxDate} from '../ngbx-date';
import {fromJSDate, NgbxCalendar, NgbxPeriod, toJSDate} from '../ngbx-calendar';
import {Injectable} from '@angular/core';
import {isNumber} from '../../util/util';
import {
  fromGregorian,
  getDayNumberInHebrewYear,
  getDaysInHebrewMonth,
  isHebrewLeapYear,
  toGregorian,
  setHebrewDay,
  setHebrewMonth
} from './hebrew';

/**
 * @since 3.2.0
 */
@Injectable()
export class NgbxCalendarHebrew extends NgbxCalendar {
  getDaysPerWeek() { return 7; }

  getMonths(year?: number) {
    if (year && isHebrewLeapYear(year)) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    } else {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
  }

  getWeeksPerMonth() { return 6; }

  isValid(date: NgbxDate): boolean {
    let b = date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
    b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
    b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
    return b && !isNaN(toGregorian(date).getTime());
  }

  getNext(date: NgbxDate, period: NgbxPeriod = 'd', number = 1) {
    date = new NgbxDate(date.year, date.month, date.day);

    switch (period) {
      case 'y':
        date.year += number;
        date.month = 1;
        date.day = 1;
        return date;
      case 'm':
        date = setHebrewMonth(date, number);
        date.day = 1;
        return date;
      case 'd':
        return setHebrewDay(date, number);
      default:
        return date;
    }
  }

  getPrev(date: NgbxDate, period: NgbxPeriod = 'd', number = 1) { return this.getNext(date, period, -number); }

  getWeekday(date: NgbxDate) {
    const day = toGregorian(date).getDay();
    // in JS Date Sun=0, in ISO 8601 Sun=7
    return day === 0 ? 7 : day;
  }

  getWeekNumber(week: NgbxDate[], firstDayOfWeek: number) {
    const date = week[week.length - 1];
    return Math.ceil(getDayNumberInHebrewYear(date) / 7);
  }

  getToday(): NgbxDate { return fromGregorian(new Date()); }

  /**
   * @since 3.4.0
   */
  toGregorian(date: NgbxDate): NgbxDate { return fromJSDate(toGregorian(date)); }

  /**
   * @since 3.4.0
   */
  fromGregorian(date: NgbxDate): NgbxDate { return fromGregorian(toJSDate(date)); }
}
