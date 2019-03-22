import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {NgbxDate} from './ngbx-date';
import {toInteger} from '../util/util';
import {NgbxDatepickerI18n} from './datepicker-i18n';

@Component({
  selector: 'ngbx-datepicker-navigation-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker-navigation-select.scss'],
  template: `
    <select
      [disabled]="disabled"
      class="custom-select"
      [value]="date?.month"
      i18n-aria-label="@@ngbx.datepicker.select-month" aria-label="Select month"
      i18n-title="@@ngbx.datepicker.select-month" title="Select month"
      (change)="changeMonth($event.target.value)">
        <option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date?.year)"
                [value]="m">{{ i18n.getMonthShortName(m, date?.year) }}</option>
    </select><select
      [disabled]="disabled"
      class="custom-select"
      [value]="date?.year"
      i18n-aria-label="@@ngbx.datepicker.select-year" aria-label="Select year"
      i18n-title="@@ngbx.datepicker.select-year" title="Select year"
      (change)="changeYear($event.target.value)">
        <option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
    </select>
  `
})
export class NgbxDatepickerNavigationSelect {
  @Input() date: NgbxDate;
  @Input() disabled: boolean;
  @Input() months: number[];
  @Input() years: number[];

  @Output() select = new EventEmitter<NgbxDate>();

  constructor(public i18n: NgbxDatepickerI18n) {}

  changeMonth(month: string) { this.select.emit(new NgbxDate(this.date.year, toInteger(month), 1)); }

  changeYear(year: string) { this.select.emit(new NgbxDate(toInteger(year), this.date.month, 1)); }
}
