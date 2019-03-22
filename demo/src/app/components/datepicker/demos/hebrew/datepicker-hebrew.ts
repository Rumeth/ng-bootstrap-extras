import {Component} from '@angular/core';
import {
  NgbxCalendar,
  NgbxCalendarHebrew, NgbxDate,
  NgbxDatepickerI18n,
  NgbxDatepickerI18nHebrew,
  NgbxDateStruct
} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-datepicker-hebrew',
  templateUrl: './datepicker-hebrew.html',
  styles: [`
    .hebrew-day {
      text-align: right;
      padding: 0.25rem 0.65rem 0.25rem 0.25rem;
      border-radius: 0.25rem;
      display: inline-block;
      height: 2.75rem;
      width: 2.75rem;
    }
    .hebrew-day:hover, .hebrew-day.focused {
      background-color: #e6e6e6;
    }
    .hebrew-day.selected {
      background-color: #007bff;
      color: white;
    }
    .outside {
      color: lightgray;
    }
    .gregorian-num {
      font-size: 0.5rem;
      direction: ltr;
    }
  `],
  providers: [
    {provide: NgbxCalendar, useClass: NgbxCalendarHebrew},
    {provide: NgbxDatepickerI18n, useClass: NgbxDatepickerI18nHebrew}
  ]
})
export class NgbxdDatepickerHebrew {

  model: NgbxDateStruct;

  constructor(private calendar: NgbxCalendar, public i18n: NgbxDatepickerI18n) {
    this.dayTemplateData = this.dayTemplateData.bind(this);
  }

  dayTemplateData(date: NgbxDate) {
    return {
      gregorian: (this.calendar as NgbxCalendarHebrew).toGregorian(date)
    };
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
