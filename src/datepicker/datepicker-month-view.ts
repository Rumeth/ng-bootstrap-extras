import {Component, Input, TemplateRef, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {MonthViewModel, DayViewModel} from './datepicker-view-model';
import {NgbxDate} from './ngbx-date';
import {NgbxDatepickerI18n} from './datepicker-i18n';
import {DayTemplateContext} from './datepicker-day-template-context';

@Component({
  selector: 'ngbx-datepicker-month-view',
  host: {'role': 'grid'},
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker-month-view.scss'],
  template: `
    <div *ngIf="showWeekdays" class="ngbx-dp-week ngbx-dp-weekdays bg-light">
      <div *ngIf="showWeekNumbers" class="ngbx-dp-weekday ngbx-dp-showweek"></div>
      <div *ngFor="let w of month.weekdays" class="ngbx-dp-weekday small">
        {{ i18n.getWeekdayShortName(w) }}
      </div>
    </div>
    <ng-template ngFor let-week [ngForOf]="month.weeks">
      <div *ngIf="!week.collapsed" class="ngbx-dp-week" role="row">
        <div *ngIf="showWeekNumbers" class="ngbx-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
        <div *ngFor="let day of week.days" (click)="doSelect(day)" class="ngbx-dp-day" role="gridcell"
          [class.disabled]="day.context.disabled"
          [tabindex]="day.tabindex"
          [class.hidden]="day.hidden"
          [class.ngbx-dp-today]="day.context.today"
          [attr.aria-label]="day.ariaLabel">
          <ng-template [ngIf]="!day.hidden">
            <ng-template [ngTemplateOutlet]="dayTemplate" [ngTemplateOutletContext]="day.context"></ng-template>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `
})
export class NgbxDatepickerMonthView {
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;
  @Input() month: MonthViewModel;
  @Input() showWeekdays;
  @Input() showWeekNumbers;

  @Output() select = new EventEmitter<NgbxDate>();

  constructor(public i18n: NgbxDatepickerI18n) {}

  doSelect(day: DayViewModel) {
    if (!day.context.disabled && !day.hidden) {
      this.select.emit(day.date);
    }
  }
}
