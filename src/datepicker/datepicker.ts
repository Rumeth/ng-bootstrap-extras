import {fromEvent, merge, Subject} from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgbxCalendar} from './ngbx-calendar';
import {NgbxDate} from './ngbx-date';
import {NgbxDatepickerService} from './datepicker-service';
import {NgbxDatepickerKeyMapService} from './datepicker-keymap-service';
import {DatepickerViewModel, NavigationEvent} from './datepicker-view-model';
import {DayTemplateContext} from './datepicker-day-template-context';
import {NgbxDatepickerConfig} from './datepicker-config';
import {NgbxDateAdapter} from './adapters/ngbx-date-adapter';
import {NgbxDateStruct} from './ngbx-date-struct';
import {NgbxDatepickerI18n} from './datepicker-i18n';
import {isChangedDate} from './datepicker-tools';
import {hasClassName} from '../util/util';

const NGB_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgbxDatepicker),
  multi: true
};

/**
 * The payload of the datepicker navigation event
 */
export interface NgbxDatepickerNavigateEvent {
  /**
   * Currently displayed month
   */
  current: {year: number, month: number};

  /**
   * Month we're navigating to
   */
  next: {year: number, month: number};

  /**
   * Function that will prevent navigation if called
   *
   * @since 4.1.0
   */
  preventDefault: () => void;
}

/**
 * A lightweight and highly configurable datepicker directive
 */
@Component({
  exportAs: 'ngbxDatepicker',
  selector: 'ngbx-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker.scss'],
  template: `
    <ng-template #dt let-date="date" let-currentMonth="currentMonth" let-selected="selected" let-disabled="disabled" let-focused="focused">
      <div ngbxDatepickerDayView
        [date]="date"
        [currentMonth]="currentMonth"
        [selected]="selected"
        [disabled]="disabled"
        [focused]="focused">
      </div>
    </ng-template>

    <div class="ngbx-dp-header bg-light">
      <ngbx-datepicker-navigation *ngIf="navigation !== 'none'"
        [date]="model.firstDate"
        [months]="model.months"
        [disabled]="model.disabled"
        [showSelect]="model.navigation === 'select'"
        [prevDisabled]="model.prevDisabled"
        [nextDisabled]="model.nextDisabled"
        [selectBoxes]="model.selectBoxes"
        (navigate)="onNavigateEvent($event)"
        (select)="onNavigateDateSelect($event)">
      </ngbx-datepicker-navigation>
    </div>

    <div #months class="ngbx-dp-months" (keydown)="onKeyDown($event)">
      <ng-template ngFor let-month [ngForOf]="model.months" let-i="index">
        <div class="ngbx-dp-month">
          <div *ngIf="navigation === 'none' || (displayMonths > 1 && navigation === 'select')"
                class="ngbx-dp-month-name bg-light">
            {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
          </div>
          <ngbx-datepicker-month-view
            [month]="month"
            [dayTemplate]="dayTemplate || dt"
            [showWeekdays]="showWeekdays"
            [showWeekNumbers]="showWeekNumbers"
            (select)="onDateSelect($event)">
          </ngbx-datepicker-month-view>
        </div>
      </ng-template>
    </div>

    <ng-template [ngTemplateOutlet]="footerTemplate"></ng-template>
  `,
  providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbxDatepickerService, NgbxDatepickerKeyMapService]
})
export class NgbxDatepicker implements OnDestroy,
    OnChanges, OnInit, ControlValueAccessor {
  model: DatepickerViewModel;

  @ViewChild('months') private _monthsEl: ElementRef<HTMLElement>;
  private _controlValue: NgbxDate;
  private _destroyed$ = new Subject<void>();

  /**
   * Reference for the custom template for the day display
   */
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;

  /**
   * Callback to pass any arbitrary data to the custom day template context
   * 'Current' contains the month that will be displayed in the view
   *
   * @since 3.3.0
   */
  @Input() dayTemplateData: (date: NgbxDate, current: {year: number, month: number}) => any;

  /**
   * Number of months to display
   */
  @Input() displayMonths: number;

  /**
   * First day of the week. With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
   */
  @Input() firstDayOfWeek: number;

  /**
   * Reference for the custom template for the footer
   *
   * @since 3.3.0
   */
  @Input() footerTemplate: TemplateRef<any>;

  /**
   * Callback to mark a given date as disabled.
   * 'Current' contains the month that will be displayed in the view
   */
  @Input() markDisabled: (date: NgbxDate, current: {year: number, month: number}) => boolean;

  /**
   * Max date for the navigation. If not provided, 'year' select box will display 10 years after current month
   */
  @Input() maxDate: NgbxDateStruct;

  /**
   * Min date for the navigation. If not provided, 'year' select box will display 10 years before current month
   */
  @Input() minDate: NgbxDateStruct;

  /**
   * Navigation type: `select` (default with select boxes for month and year), `arrows`
   * (without select boxes, only navigation arrows) or `none` (no navigation at all)
   */
  @Input() navigation: 'select' | 'arrows' | 'none';

  /**
   * The way to display days that don't belong to current month: `visible` (default),
   * `hidden` (not displayed) or `collapsed` (not displayed with empty space collapsed)
   */
  @Input() outsideDays: 'visible' | 'collapsed' | 'hidden';

  /**
   * Whether to display days of the week
   */
  @Input() showWeekdays: boolean;

  /**
   * Whether to display week numbers
   */
  @Input() showWeekNumbers: boolean;

  /**
   * Date to open calendar with.
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date provided, calendar will open with current month.
   * Use 'navigateTo(date)' as an alternative
   */
  @Input() startDate: {year: number, month: number, day?: number};

  /**
   * An event fired right before the navigation happens and currently displayed month changes.
   * See NgbxDatepickerNavigateEvent for the payload info.
   */
  @Output() navigate = new EventEmitter<NgbxDatepickerNavigateEvent>();

  /**
   * An event fired when user selects a date using keyboard or mouse.
   * The payload of the event is currently selected NgbxDate.
   */
  @Output() select = new EventEmitter<NgbxDate>();

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(
      private _keyMapService: NgbxDatepickerKeyMapService, public _service: NgbxDatepickerService,
      private _calendar: NgbxCalendar, public i18n: NgbxDatepickerI18n, config: NgbxDatepickerConfig,
      private _cd: ChangeDetectorRef, private _elementRef: ElementRef<HTMLElement>,
      private _ngbxDateAdapter: NgbxDateAdapter<any>, private _ngZone: NgZone) {
    ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
     'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
        .forEach(input => this[input] = config[input]);

    _service.select$.pipe(takeUntil(this._destroyed$)).subscribe(date => { this.select.emit(date); });

    _service.model$.pipe(takeUntil(this._destroyed$)).subscribe(model => {
      const newDate = model.firstDate;
      const oldDate = this.model ? this.model.firstDate : null;

      let navigationPrevented = false;
      // emitting navigation event if the first month changes
      if (!newDate.equals(oldDate)) {
        this.navigate.emit({
          current: oldDate ? {year: oldDate.year, month: oldDate.month} : null,
          next: {year: newDate.year, month: newDate.month},
          preventDefault: () => navigationPrevented = true
        });

        // can't prevent the very first navigation
        if (navigationPrevented && oldDate !== null) {
          this._service.reset(this.model);
          return;
        }
      }

      const newSelectedDate = model.selectedDate;
      const newFocusedDate = model.focusDate;
      const oldFocusedDate = this.model ? this.model.focusDate : null;

      this.model = model;

      // handling selection change
      if (isChangedDate(newSelectedDate, this._controlValue)) {
        this._controlValue = newSelectedDate;
        this.onTouched();
        this.onChange(this._ngbxDateAdapter.toModel(newSelectedDate));
      }

      // handling focus change
      if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
        this.focus();
      }

      _cd.markForCheck();
    });
  }

  /**
   * Manually focus the focusable day in the datepicker
   */
  focus() {
    this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
      const elementToFocus =
          this._elementRef.nativeElement.querySelector<HTMLDivElement>('div.ngbx-dp-day[tabindex="0"]');
      if (elementToFocus) {
        elementToFocus.focus();
      }
    });
  }

  /**
   * Navigates current view to provided date.
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date provided calendar will open current month.
   * Use 'startDate' input as an alternative
   */
  navigateTo(date?: {year: number, month: number, day?: number}) {
    this._service.open(NgbxDate.from(date ? date.day ? date as NgbxDateStruct : {...date, day: 1} : null));
  }

  ngAfterContentInit() {
    this._ngZone.runOutsideAngular(() => {
      const focusIns$ = fromEvent<FocusEvent>(this._monthsEl.nativeElement, 'focusin');
      const focusOuts$ = fromEvent<FocusEvent>(this._monthsEl.nativeElement, 'focusout');

      // we're changing 'focusVisible' only when entering or leaving months view
      // and ignoring all focus events where both 'target' and 'related' target are day cells
      merge(focusIns$, focusOuts$)
          .pipe(
              filter(
                  ({target, relatedTarget}) =>
                      !(hasClassName(target, 'ngbx-dp-day') && hasClassName(relatedTarget, 'ngbx-dp-day'))),
              takeUntil(this._destroyed$))
          .subscribe(({type}) => this._ngZone.run(() => this._service.focusVisible = type === 'focusin'));
    });
  }

  ngOnDestroy() { this._destroyed$.next(); }

  ngOnInit() {
    if (this.model === undefined) {
      ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
       'outsideDays']
          .forEach(input => this._service[input] = this[input]);
      this.navigateTo(this.startDate);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
     'outsideDays']
        .filter(input => input in changes)
        .forEach(input => this._service[input] = this[input]);

    if ('startDate' in changes) {
      this.navigateTo(this.startDate);
    }
  }

  onDateSelect(date: NgbxDate) {
    this._service.focus(date);
    this._service.select(date, {emitEvent: true});
  }

  onKeyDown(event: KeyboardEvent) { this._keyMapService.processKey(event); }

  onNavigateDateSelect(date: NgbxDate) { this._service.open(date); }

  onNavigateEvent(event: NavigationEvent) {
    switch (event) {
      case NavigationEvent.PREV:
        this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
        break;
      case NavigationEvent.NEXT:
        this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
        break;
    }
  }

  registerOnChange(fn: (value: any) => any): void { this.onChange = fn; }

  registerOnTouched(fn: () => any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean) { this._service.disabled = isDisabled; }

  writeValue(value) {
    this._controlValue = NgbxDate.from(this._ngbxDateAdapter.fromModel(value));
    this._service.select(this._controlValue);
  }
}
