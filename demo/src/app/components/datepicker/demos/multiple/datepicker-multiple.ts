import {Component} from '@angular/core';

@Component({
  selector: 'ngbxd-datepicker-multiple',
  templateUrl: './datepicker-multiple.html',
  styles: [`
    select.custom-select {
      margin: 0.5rem 0.5rem 0 0;
      width: auto;
    }
  `]
})
export class NgbxdDatepickerMultiple {

  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
}
