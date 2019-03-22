import {Component} from '@angular/core';
import {NgbxCalendar, NgbxDate, NgbxDateStruct} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-datepicker-customday',
  templateUrl: './datepicker-customday.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      border-radius: 0.25rem;
      display: inline-block;
      width: 2rem;
    }
    .custom-day:hover, .custom-day.focused {
      background-color: #e6e6e6;
    }
    .weekend {
      background-color: #f0ad4e;
      border-radius: 1rem;
      color: white;
    }
    .hidden {
      display: none;
    }
  `]
})
export class NgbxdDatepickerCustomday {
  model: NgbxDateStruct;

  constructor(private calendar: NgbxCalendar) {
  }

  isDisabled = (date: NgbxDate, current: {month: number}) => date.month !== current.month;
  isWeekend = (date: NgbxDate) =>  this.calendar.getWeekday(date) >= 6;
}
