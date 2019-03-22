import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {NavigationEvent, MonthViewModel} from './datepicker-view-model';
import {NgbxDate} from './ngbx-date';
import {NgbxDatepickerI18n} from './datepicker-i18n';

@Component({
  selector: 'ngbx-datepicker-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker-navigation.scss'],
  template: `
    <div class="ngbx-dp-arrow">
      <button type="button" class="btn btn-link ngbx-dp-arrow-btn" (click)="navigate.emit(navigation.PREV)" [disabled]="prevDisabled"
              i18n-aria-label="@@ngbx.datepicker.previous-month" aria-label="Previous month"
              i18n-title="@@ngbx.datepicker.previous-month" title="Previous month">
        <span class="ngbx-dp-navigation-chevron"></span>
      </button>
    </div>
    <ngbx-datepicker-navigation-select *ngIf="showSelect" class="ngbx-dp-navigation-select"
      [date]="date"
      [disabled] = "disabled"
      [months]="selectBoxes.months"
      [years]="selectBoxes.years"
      (select)="select.emit($event)">
    </ngbx-datepicker-navigation-select>

    <ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
      <div class="ngbx-dp-arrow" *ngIf="i > 0"></div>
      <div class="ngbx-dp-month-name">
        {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
      </div>
      <div class="ngbx-dp-arrow" *ngIf="i !== months.length - 1"></div>
    </ng-template>
    <div class="ngbx-dp-arrow right">
      <button type="button" class="btn btn-link ngbx-dp-arrow-btn" (click)="navigate.emit(navigation.NEXT)" [disabled]="nextDisabled"
              i18n-aria-label="@@ngbx.datepicker.next-month" aria-label="Next month"
              i18n-title="@@ngbx.datepicker.next-month" title="Next month">
        <span class="ngbx-dp-navigation-chevron"></span>
      </button>
    </div>
    `
})
export class NgbxDatepickerNavigation {
  navigation = NavigationEvent;

  @Input() date: NgbxDate;
  @Input() disabled: boolean;
  @Input() months: MonthViewModel[] = [];
  @Input() showSelect: boolean;
  @Input() prevDisabled: boolean;
  @Input() nextDisabled: boolean;
  @Input() selectBoxes: {years: number[], months: number[]};

  @Output() navigate = new EventEmitter<NavigationEvent>();
  @Output() select = new EventEmitter<NgbxDate>();

  constructor(public i18n: NgbxDatepickerI18n) {}
}
