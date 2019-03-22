import {Component} from '@angular/core';
import {NgbxDatepickerConfig, NgbxCalendar, NgbxDate, NgbxDateStruct} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-datepicker-config',
  templateUrl: './datepicker-config.html',
  providers: [NgbxDatepickerConfig] // add NgbxDatepickerConfig to the component providers
})
export class NgbxdDatepickerConfig {

  model: NgbxDateStruct;

  constructor(config: NgbxDatepickerConfig, calendar: NgbxCalendar) {
    // customize default values of datepickers used by this component tree
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // weekends are disabled
    config.markDisabled = (date: NgbxDate) => calendar.getWeekday(date) >= 6;
  }
}
