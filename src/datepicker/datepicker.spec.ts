import {TestBed, ComponentFixture, async, inject, fakeAsync, tick} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';
import {getMonthSelect, getYearSelect, getNavigationLinks} from '../test/datepicker/common';

import {Component, TemplateRef, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';

import {NgbxDatepickerModule, NgbxDatepickerNavigateEvent} from './datepicker.module';
import {NgbxDate} from './ngbx-date';
import {NgbxDatepickerConfig} from './datepicker-config';
import {NgbxDatepicker} from './datepicker';
import {DayTemplateContext} from './datepicker-day-template-context';
import {NgbxDateStruct} from './ngbx-date-struct';
import {NgbxDatepickerMonthView} from './datepicker-month-view';
import {NgbxDatepickerDayView} from './datepicker-day-view';
import {NgbxDatepickerNavigationSelect} from './datepicker-navigation-select';
import {NgbxDatepickerNavigation} from './datepicker-navigation';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getDates(element: HTMLElement): HTMLElement[] {
  return <HTMLElement[]>Array.from(element.querySelectorAll('.ngbx-dp-day'));
}

function getDay(element: HTMLElement, index: number): HTMLElement {
  return getDates(element)[index].querySelector('div') as HTMLElement;
}

function getDatepicker(element: HTMLElement): HTMLElement {
  return element.querySelector('ngbx-datepicker') as HTMLElement;
}

function getFocusableDays(element: DebugElement): DebugElement[] {
  return <DebugElement[]>Array.from(element.queryAll(By.css('div.ngbx-dp-day[tabindex="0"]')));
}

function getSelectedDays(element: DebugElement): DebugElement[] {
  return <DebugElement[]>Array.from(element.queryAll(By.css('div.ngbx-dp-day > div.bg-primary')));
}

function focusDay() {
  const element = document.querySelector('div.ngbx-dp-day[tabindex="0"]') as HTMLElement;
  const evt = document.createEvent('Event');
  evt.initEvent('focusin', true, false);
  element.dispatchEvent(evt);
  element.focus();
}

function triggerKeyDown(element: DebugElement, keyCode: number, shiftKey = false) {
  let event = {
    which: keyCode,
    shiftKey: shiftKey,
    defaultPrevented: false,
    propagationStopped: false,
    stopPropagation: function() { this.propagationStopped = true; },
    preventDefault: function() { this.defaultPrevented = true; }
  };
  expect(document.activeElement.classList.contains('ngbx-dp-day'))
      .toBeTruthy('You must focus day before triggering key events');
  element.triggerEventHandler('keydown', event);
  return event;
}

function getMonthContainer(datepicker: DebugElement) {
  return datepicker.query(By.css('div.ngbx-dp-months'));
}

function expectSelectedDate(element: DebugElement, selectedDate: NgbxDate) {
  // checking we have 1 day with .selected class
  const days = getSelectedDays(element);

  if (selectedDate) {
    expect(days.length).toBe(1);

    // checking it corresponds to our date
    const day = days[0];
    const dayView = day.parent.query(By.directive(NgbxDatepickerDayView)).componentInstance as NgbxDatepickerDayView;
    expect(NgbxDate.from(dayView.date)).toEqual(selectedDate);
  } else {
    expect(days.length).toBe(0);
  }
}

function expectFocusedDate(element: DebugElement, focusableDate: NgbxDate, isFocused = true) {
  // checking we have 1 day with tabIndex 0
  const days = getFocusableDays(element);
  expect(days.length).toBe(1);

  const day = days[0];

  // checking it corresponds to our date
  const dayView = day.query(By.directive(NgbxDatepickerDayView)).componentInstance as NgbxDatepickerDayView;
  expect(NgbxDate.from(dayView.date)).toEqual(focusableDate);

  // checking the active class
  // Unable to test it because of unknown failure (works when tested manually)
  // expect(day.queryAll(By.css('div.active')).length).toEqual(1, `The day must have a single element with the active
  // class`);

  // checking it is focused by the browser
  if (isFocused) {
    expect(document.activeElement).toBe(day.nativeElement, `Date HTML element for ${focusableDate} is not focused`);
  } else {
    expect(document.activeElement)
        .not.toBe(day.nativeElement, `Date HTML element for ${focusableDate} must not be focused`);
  }
}


function expectSameValues(datepicker: NgbxDatepicker, config: NgbxDatepickerConfig) {
  expect(datepicker.dayTemplate).toBe(config.dayTemplate);
  expect(datepicker.dayTemplateData).toBe(config.dayTemplateData);
  expect(datepicker.displayMonths).toBe(config.displayMonths);
  expect(datepicker.firstDayOfWeek).toBe(config.firstDayOfWeek);
  expect(datepicker.footerTemplate).toBe(config.footerTemplate);
  expect(datepicker.markDisabled).toBe(config.markDisabled);
  expect(datepicker.minDate).toEqual(config.minDate);
  expect(datepicker.maxDate).toEqual(config.maxDate);
  expect(datepicker.navigation).toBe(config.navigation);
  expect(datepicker.outsideDays).toBe(config.outsideDays);
  expect(datepicker.showWeekdays).toBe(config.showWeekdays);
  expect(datepicker.showWeekNumbers).toBe(config.showWeekNumbers);
  expect(datepicker.startDate).toEqual(config.startDate);
}

function customizeConfig(config: NgbxDatepickerConfig) {
  config.dayTemplate = {} as TemplateRef<DayTemplateContext>;
  config.dayTemplateData = (date, current) => 42;
  config.firstDayOfWeek = 2;
  config.footerTemplate = {} as TemplateRef<any>;
  config.markDisabled = (date, current) => false;
  config.minDate = {year: 2000, month: 1, day: 1};
  config.maxDate = {year: 2030, month: 12, day: 31};
  config.navigation = 'none';
  config.outsideDays = 'collapsed';
  config.showWeekdays = false;
  config.showWeekNumbers = true;
  config.startDate = {year: 2015, month: 1};
}

describe('ngbx-datepicker', () => {

  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [TestComponent], imports: [NgbxDatepickerModule, FormsModule, ReactiveFormsModule]});
  });

  it('should initialize inputs with provided config', () => {
    const defaultConfig = new NgbxDatepickerConfig();
    const datepicker = TestBed.createComponent(NgbxDatepicker).componentInstance;
    expectSameValues(datepicker, defaultConfig);
  });

  it('should display current month if no date provided', () => {
    const fixture = createTestComponent(`<ngbx-datepicker></ngbx-datepicker>`);

    const today = new Date();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(`${today.getMonth() + 1}`);
    expect(getYearSelect(fixture.nativeElement).value).toBe(`${today.getFullYear()}`);
  });

  it('should throw if max date is before min date', () => {
    expect(() => {
      createTestComponent('<ngbx-datepicker [minDate]="maxDate" [maxDate]="minDate"></ngbx-datepicker>');
    }).toThrowError();
  });

  it('should handle incorrect startDate values', () => {
    const fixture = createTestComponent(`<ngbx-datepicker [startDate]="date"></ngbx-datepicker>`);
    const today = new Date();
    const currentMonth = `${today.getMonth() + 1}`;
    const currentYear = `${today.getFullYear()}`;

    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    fixture.componentInstance.date = null;
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(currentMonth);
    expect(getYearSelect(fixture.nativeElement).value).toBe(currentYear);

    fixture.componentInstance.date = undefined;
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(currentMonth);
    expect(getYearSelect(fixture.nativeElement).value).toBe(currentYear);

    fixture.componentInstance.date = <any>{};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(currentMonth);
    expect(getYearSelect(fixture.nativeElement).value).toBe(currentYear);

    fixture.componentInstance.date = <any>new Date();
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(currentMonth);
    expect(getYearSelect(fixture.nativeElement).value).toBe(currentYear);

    fixture.componentInstance.date = new NgbxDate(3000000, 1, 1);
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(currentMonth);
    expect(getYearSelect(fixture.nativeElement).value).toBe(currentYear);
  });

  it('should allow infinite navigation when min/max dates are not set', () => {
    const fixture = createTestComponent(`<ngbx-datepicker [startDate]="date"></ngbx-datepicker>`);

    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    fixture.componentInstance.date = {year: 1066, month: 2};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('2');
    expect(getYearSelect(fixture.nativeElement).value).toBe('1066');

    fixture.componentInstance.date = {year: 3066, month: 5};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('5');
    expect(getYearSelect(fixture.nativeElement).value).toBe('3066');
  });

  it('should allow setting minDate separately', () => {
    const fixture = createTestComponent(`<ngbx-datepicker [minDate]="minDate" [startDate]="date"></ngbx-datepicker>`);

    fixture.componentInstance.minDate = {year: 2000, month: 5, day: 20};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    fixture.componentInstance.date = {year: 1000, month: 2};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('5');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2000');

    fixture.componentInstance.date = {year: 3000, month: 5};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('5');
    expect(getYearSelect(fixture.nativeElement).value).toBe('3000');
  });

  it('should allow setting maxDate separately', () => {
    const fixture = createTestComponent(`<ngbx-datepicker [maxDate]="maxDate" [startDate]="date"></ngbx-datepicker>`);

    fixture.componentInstance.maxDate = {year: 2050, month: 5, day: 20};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    fixture.componentInstance.date = {year: 3000, month: 2};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('5');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2050');

    fixture.componentInstance.date = {year: 1000, month: 5};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('5');
    expect(getYearSelect(fixture.nativeElement).value).toBe('1000');
  });

  it('should handle minDate edge case values', () => {
    const fixture = createTestComponent(`<ngbx-datepicker [minDate]="minDate" [startDate]="date"></ngbx-datepicker>`);

    function expectMinDate(year: number, month: number) {
      fixture.componentInstance.date = {year: 1000, month: 1};
      fixture.detectChanges();
      expect(getMonthSelect(fixture.nativeElement).value).toBe(`${month}`);
      expect(getYearSelect(fixture.nativeElement).value).toBe(`${year}`);
    }

    expectMinDate(2010, 1);

    // resetting
    fixture.componentInstance.minDate = <any>{};
    expectMinDate(1000, 1);

    // resetting
    fixture.componentInstance.minDate = <any>new Date();
    expectMinDate(1000, 1);

    // resetting
    fixture.componentInstance.minDate = new NgbxDate(3000000, 1, 1);
    expectMinDate(1000, 1);

    // resetting
    fixture.componentInstance.minDate = null;
    expectMinDate(1000, 1);

    // resetting
    fixture.componentInstance.minDate = undefined;
    expectMinDate(1000, 1);
  });

  it('should handle maxDate edge case values', () => {
    const fixture = createTestComponent(`<ngbx-datepicker [maxDate]="maxDate" [startDate]="date"></ngbx-datepicker>`);

    function expectMaxDate(year: number, month: number) {
      fixture.componentInstance.date = {year: 10000, month: 1};
      fixture.detectChanges();
      expect(getMonthSelect(fixture.nativeElement).value).toBe(`${month}`);
      expect(getYearSelect(fixture.nativeElement).value).toBe(`${year}`);
    }

    expectMaxDate(2020, 12);

    // resetting
    fixture.componentInstance.maxDate = <any>{};
    expectMaxDate(10000, 1);

    // resetting
    fixture.componentInstance.maxDate = <any>new Date();
    expectMaxDate(10000, 1);

    // resetting
    fixture.componentInstance.maxDate = new NgbxDate(3000000, 1, 1);
    expectMaxDate(10000, 1);

    // resetting
    fixture.componentInstance.maxDate = null;
    expectMaxDate(10000, 1);

    // resetting
    fixture.componentInstance.maxDate = undefined;
    expectMaxDate(10000, 1);
  });

  it('should support disabling dates via min/max dates', () => {
    const fixture = createTestComponent(
        `<ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate"></ngbx-datepicker>`);

    fixture.componentInstance.minDate = {year: 2016, month: 8, day: 20};
    fixture.componentInstance.maxDate = {year: 2016, month: 8, day: 25};
    fixture.detectChanges();

    // 19 AUG 2016
    expect(getDay(fixture.nativeElement, 18)).toHaveCssClass('text-muted');
    // 20 AUG 2016
    expect(getDay(fixture.nativeElement, 19)).not.toHaveCssClass('text-muted');
    // 25 AUG 2016
    expect(getDay(fixture.nativeElement, 24)).not.toHaveCssClass('text-muted');
    // 26 AUG 2016
    expect(getDay(fixture.nativeElement, 25)).toHaveCssClass('text-muted');
  });

  it('should support disabling dates via callback', () => {
    const fixture = createTestComponent(
        `<ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [markDisabled]="markDisabled"></ngbx-datepicker>`);

    // 22 AUG 2016
    expect(getDay(fixture.nativeElement, 21)).toHaveCssClass('text-muted');
  });

  it('should support passing custom data to the day template', () => {
    const fixture = createTestComponent(`
      <ng-template #dt let-date="date" let-data="data"><div>{{ date.day }}{{ data }}</div></ng-template>
      <ngbx-datepicker [startDate]="date" [dayTemplate]="dt" [dayTemplateData]="dayTemplateData"></ngbx-datepicker>
    `);

    // 22 AUG 2016
    expect(getDay(fixture.nativeElement, 21).innerText).toBe('22!');
  });

  it('should display multiple months', () => {
    const fixture = createTestComponent(`<ngbx-datepicker [displayMonths]="displayMonths"></ngbx-datepicker>`);

    let months = fixture.debugElement.queryAll(By.directive(NgbxDatepickerMonthView));
    expect(months.length).toBe(1);

    fixture.componentInstance.displayMonths = 3;
    fixture.detectChanges();
    months = fixture.debugElement.queryAll(By.directive(NgbxDatepickerMonthView));
    expect(months.length).toBe(3);
  });

  it('should reuse DOM elements when changing month (single month display)', () => {
    const fixture = createTestComponent(`<ngbx-datepicker [startDate]="date"></ngbx-datepicker>`);

    // AUG 2016
    const oldDates = getDates(fixture.nativeElement);
    const navigation = getNavigationLinks(fixture.nativeElement);
    expect(oldDates[0].innerText.trim()).toBe('1');

    // JUL 2016
    navigation[0].click();
    fixture.detectChanges();

    const newDates = getDates(fixture.nativeElement);
    expect(newDates[0].innerText.trim()).toBe('27');

    expect(oldDates).toEqual(newDates);
  });

  it('should reuse DOM elements when changing month (multiple months display)', () => {
    const fixture = createTestComponent(`<ngbx-datepicker [displayMonths]="2" [startDate]="date"></ngbx-datepicker>`);

    // AUG 2016 and SEP 2016
    const oldDates = getDates(fixture.nativeElement);
    const oldAugDates = oldDates.slice(0, 42);
    const oldSepDates = oldDates.slice(42);

    const navigation = getNavigationLinks(fixture.nativeElement);
    expect(oldAugDates[0].innerText.trim()).toBe('1');
    expect(oldSepDates[3].innerText.trim()).toBe('1');

    // JUL 2016 and AUG 2016
    navigation[0].click();
    fixture.detectChanges();

    const newDates = getDates(fixture.nativeElement);
    const newJulDates = newDates.slice(0, 42);
    const newAugDates = newDates.slice(42);

    expect(newJulDates[0].innerText.trim()).toBe('27');
    expect(newAugDates[0].innerText.trim()).toBe('1');

    // DOM elements were reused:
    expect(newAugDates).toEqual(oldAugDates);
    expect(newJulDates).toEqual(oldSepDates);
  });

  it('should switch navigation types', () => {
    const fixture = createTestComponent(`<ngbx-datepicker [navigation]="navigation"></ngbx-datepicker>`);

    expect(fixture.debugElement.query(By.directive(NgbxDatepickerNavigationSelect))).not.toBeNull();
    expect(fixture.debugElement.query(By.directive(NgbxDatepickerNavigation))).not.toBeNull();

    fixture.componentInstance.navigation = 'arrows';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(NgbxDatepickerNavigationSelect))).toBeNull();
    expect(fixture.debugElement.query(By.directive(NgbxDatepickerNavigation))).not.toBeNull();

    fixture.componentInstance.navigation = 'none';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(NgbxDatepickerNavigationSelect))).toBeNull();
    expect(fixture.debugElement.query(By.directive(NgbxDatepickerNavigation))).toBeNull();
  });

  it('should toggle month names display for a single month', () => {
    const fixture = createTestComponent(
        `<ngbx-datepicker [startDate]="date" [displayMonths]="1" [navigation]="navigation"></ngbx-datepicker>`);

    let months = fixture.debugElement.queryAll(By.css('.ngbx-dp-month-name'));
    expect(months.length).toBe(0);

    fixture.componentInstance.navigation = 'arrows';
    fixture.detectChanges();
    months = fixture.debugElement.queryAll(By.css('.ngbx-dp-month-name'));
    expect(months.length).toBe(1);
    expect(months.map(c => c.nativeElement.innerText.trim())).toEqual(['August 2016']);

    fixture.componentInstance.navigation = 'none';
    fixture.detectChanges();
    months = fixture.debugElement.queryAll(By.css('.ngbx-dp-month-name'));
    expect(months.length).toBe(1);
    expect(months.map(c => c.nativeElement.innerText.trim())).toEqual(['August 2016']);
  });

  it('should always display month names for multiple months', () => {
    const fixture = createTestComponent(
        `<ngbx-datepicker [startDate]="date" [displayMonths]="3" [navigation]="navigation"></ngbx-datepicker>`);

    let months = fixture.debugElement.queryAll(By.css('.ngbx-dp-month-name'));
    expect(months.length).toBe(3);
    expect(months.map(c => c.nativeElement.innerText.trim())).toEqual([
      'August 2016', 'September 2016', 'October 2016'
    ]);

    fixture.componentInstance.navigation = 'arrows';
    fixture.detectChanges();
    months = fixture.debugElement.queryAll(By.css('.ngbx-dp-month-name'));
    expect(months.length).toBe(3);
    expect(months.map(c => c.nativeElement.innerText.trim())).toEqual([
      'August 2016', 'September 2016', 'October 2016'
    ]);
  });

  it('should emit navigate event when startDate is defined', () => {
    TestBed.overrideComponent(
        TestComponent,
        {set: {template: `<ngbx-datepicker [startDate]="date" (navigate)="onNavigate($event)"></ngbx-datepicker>`}});
    const fixture = TestBed.createComponent(TestComponent);

    spyOn(fixture.componentInstance, 'onNavigate');
    fixture.detectChanges();

    expect(fixture.componentInstance.onNavigate)
        .toHaveBeenCalledWith({current: null, next: {year: 2016, month: 8}, preventDefault: jasmine.any(Function)});
  });

  it('should emit navigate event without startDate defined', () => {
    TestBed.overrideComponent(
        TestComponent, {set: {template: `<ngbx-datepicker (navigate)="onNavigate($event)"></ngbx-datepicker>`}});
    const fixture = TestBed.createComponent(TestComponent);
    const now = new Date();

    spyOn(fixture.componentInstance, 'onNavigate');
    fixture.detectChanges();

    expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith({
      current: null,
      next: {year: now.getFullYear(), month: now.getMonth() + 1},
      preventDefault: jasmine.any(Function)
    });
  });

  it('should emit navigate event using built-in navigation arrows', () => {
    const fixture =
        createTestComponent(`<ngbx-datepicker [startDate]="date" (navigate)="onNavigate($event)"></ngbx-datepicker>`);

    spyOn(fixture.componentInstance, 'onNavigate');
    const navigation = getNavigationLinks(fixture.nativeElement);

    // JUL 2016
    navigation[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith({
      current: {year: 2016, month: 8},
      next: {year: 2016, month: 7},
      preventDefault: jasmine.any(Function)
    });
  });

  it('should emit navigate event using navigateTo({date})', () => {
    const fixture =
        createTestComponent(`<ngbx-datepicker #dp [startDate]="date" (navigate)="onNavigate($event)"></ngbx-datepicker>
       <button id="btn"(click)="dp.navigateTo({year: 2015, month: 6})"></button>`);

    spyOn(fixture.componentInstance, 'onNavigate');
    const button = fixture.nativeElement.querySelector('button#btn');
    button.click();

    fixture.detectChanges();
    expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith({
      current: {year: 2016, month: 8},
      next: {year: 2015, month: 6},
      preventDefault: jasmine.any(Function)
    });
  });

  it('should prevent navigation when calling preventDefault()', () => {
    const fixture = createTestComponent(
        `<ngbx-datepicker #dp [startDate]="date" (navigate)="onPreventableNavigate($event)"></ngbx-datepicker>
       <button id="btn"(click)="dp.navigateTo({year: 2015, month: 7})"></button>`);

    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    const button = fixture.nativeElement.querySelector('button#btn');
    button.click();
    fixture.detectChanges();

    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');
  });

  it('should not focus day initially', () => {
    const fixture = createTestComponent('<ngbx-datepicker #dp [startDate]="date"></ngbx-datepicker>');
    const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));
    expectFocusedDate(datepicker, new NgbxDate(2016, 8, 1), false);
  });

  it('should remove focus day on blur', () => {
    const fixture =
        createTestComponent('<ngbx-datepicker #dp [startDate]="date"></ngbx-datepicker><input id="focusout" >');
    const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));

    // focus in
    focusDay();
    fixture.detectChanges();
    expectFocusedDate(datepicker, new NgbxDate(2016, 8, 1), true);

    // focus out
    (document.querySelector('#focusout') as HTMLElement).focus();

    fixture.detectChanges();
    expectFocusedDate(datepicker, new NgbxDate(2016, 8, 1), false);
    expectSelectedDate(datepicker, null);

  });

  it('should emit select event when select date', () => {
    const fixture =
        createTestComponent(`<ngbx-datepicker #dp [startDate]="date" (select)="onSelect($event)"></ngbx-datepicker>`);

    spyOn(fixture.componentInstance, 'onSelect');
    let dates = getDates(fixture.nativeElement);
    dates[11].click();

    fixture.detectChanges();
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledTimes(1);
  });

  it('should emit select event twice when select same date twice', () => {
    const fixture =
        createTestComponent(`<ngbx-datepicker #dp [startDate]="date" (select)="onSelect($event)"></ngbx-datepicker>`);

    spyOn(fixture.componentInstance, 'onSelect');
    let dates = getDates(fixture.nativeElement);

    dates[11].click();
    fixture.detectChanges();

    dates[11].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.onSelect).toHaveBeenCalledTimes(2);
  });

  it('should emit select event twice when press enter key twice', () => {
    const fixture =
        createTestComponent(`<ngbx-datepicker #dp [startDate]="date" (select)="onSelect($event)"></ngbx-datepicker>`);
    const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));

    spyOn(fixture.componentInstance, 'onSelect');

    focusDay();
    fixture.detectChanges();

    triggerKeyDown(getMonthContainer(datepicker), 13 /* enter */);
    fixture.detectChanges();

    triggerKeyDown(getMonthContainer(datepicker), 13 /* enter */);
    fixture.detectChanges();
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledTimes(2);
  });

  it('should emit select event twice when press space key twice', () => {
    const fixture =
        createTestComponent(`<ngbx-datepicker #dp [startDate]="date" (select)="onSelect($event)"></ngbx-datepicker>`);
    const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));

    spyOn(fixture.componentInstance, 'onSelect');

    focusDay();
    fixture.detectChanges();

    triggerKeyDown(getMonthContainer(datepicker), 32 /* space */);
    fixture.detectChanges();

    triggerKeyDown(getMonthContainer(datepicker), 32 /* space */);
    fixture.detectChanges();
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledTimes(2);
  });

  it('should insert an embedded view for footer when `footerTemplate` provided', () => {
    const fixture = createTestComponent(`<ngbx-datepicker #dp [footerTemplate]="footerTemplate"></ngbx-datepicker>
      <ng-template #footerTemplate><span id="myDatepickerFooter">My footer</span></ng-template>`);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#myDatepickerFooter')).not.toBeNull();
  });

  describe('ngModel', () => {

    it('should update model based on calendar clicks', async(() => {
         const fixture = createTestComponent(
             `<ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model"></ngbx-datepicker>`);

         const dates = getDates(fixture.nativeElement);
         dates[0].click();  // 1 AUG 2016
         expect(fixture.componentInstance.model).toEqual({year: 2016, month: 8, day: 1});

         dates[1].click();
         expect(fixture.componentInstance.model).toEqual({year: 2016, month: 8, day: 2});
       }));

    it('should not update model based on calendar clicks when disabled', async(() => {
         const fixture = createTestComponent(
             `<ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model" [disabled]="true">
              </ngbx-datepicker>`);

         fixture.whenStable()
             .then(() => {
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {

               const dates = getDates(fixture.nativeElement);
               dates[0].click();  // 1 AUG 2016
               expect(fixture.componentInstance.model).toBeFalsy();

               dates[1].click();
               expect(fixture.componentInstance.model).toBeFalsy();
             });
       }));

    it('select calendar date based on model updates', async(() => {
         const fixture = createTestComponent(
             `<ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model"></ngbx-datepicker>`);

         fixture.componentInstance.model = {year: 2016, month: 8, day: 1};

         fixture.detectChanges();
         fixture.whenStable()
             .then(() => {
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               expect(getDay(fixture.nativeElement, 0)).toHaveCssClass('bg-primary');

               fixture.componentInstance.model = {year: 2016, month: 8, day: 2};
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               expect(getDay(fixture.nativeElement, 0)).not.toHaveCssClass('bg-primary');
               expect(getDay(fixture.nativeElement, 1)).toHaveCssClass('bg-primary');
             });
       }));

    it('should switch month when clicked on the date outside of current month', async(() => {
         const fixture = createTestComponent(
             `<ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model"></ngbx-datepicker>`);
         fixture.detectChanges();
         fixture.whenStable().then(() => {

           let dates = getDates(fixture.nativeElement);

           dates[31].click();  // 1 SEP 2016
           expect(fixture.componentInstance.model).toEqual({year: 2016, month: 9, day: 1});

           // month changes to SEP
           fixture.detectChanges();
           expect(getDay(fixture.nativeElement, 0).innerText).toBe('29');          // 29 AUG 2016
           expect(getDay(fixture.nativeElement, 3)).toHaveCssClass('bg-primary');  // 1 SEP still selected
         });
       }));

    it('should switch month on prev/next navigation click', async(() => {
         const fixture = createTestComponent(
             `<ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model"></ngbx-datepicker>`);

         let dates = getDates(fixture.nativeElement);
         const navigation = getNavigationLinks(fixture.nativeElement);

         dates[0].click();  // 1 AUG 2016
         expect(fixture.componentInstance.model).toEqual({year: 2016, month: 8, day: 1});

         // PREV
         navigation[0].click();
         fixture.detectChanges();
         dates = getDates(fixture.nativeElement);
         dates[4].click();  // 1 JUL 2016
         expect(fixture.componentInstance.model).toEqual({year: 2016, month: 7, day: 1});

         // NEXT
         navigation[1].click();
         fixture.detectChanges();
         dates = getDates(fixture.nativeElement);
         dates[0].click();  // 1 AUG 2016
         expect(fixture.componentInstance.model).toEqual({year: 2016, month: 8, day: 1});
       }));

    it('should switch month using navigateTo({date})', async(() => {
         const fixture = createTestComponent(
             `<ngbx-datepicker #dp [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model"></ngbx-datepicker>
       <button id="btn"(click)="dp.navigateTo({year: 2015, month: 6})"></button>`);

         const button = fixture.nativeElement.querySelector('button#btn');
         button.click();

         fixture.detectChanges();
         expect(getMonthSelect(fixture.nativeElement).value).toBe('6');
         expect(getYearSelect(fixture.nativeElement).value).toBe('2015');

         const dates = getDates(fixture.nativeElement);
         dates[0].click();  // 1 JUN 2015
         expect(fixture.componentInstance.model).toEqual({year: 2015, month: 6, day: 1});
       }));

    it('should switch to current month using navigateTo() without arguments', () => {
      const fixture = createTestComponent(
          `<ngbx-datepicker #dp [startDate]="date" [minDate]="minDate" [maxDate]="maxDate"></ngbx-datepicker>
       <button id="btn"(click)="dp.navigateTo()"></button>`);

      const button = fixture.nativeElement.querySelector('button#btn');
      button.click();

      fixture.detectChanges();
      const today = new Date();
      expect(getMonthSelect(fixture.nativeElement).value).toBe(`${today.getMonth() + 1}`);
      expect(getYearSelect(fixture.nativeElement).value).toBe(`${today.getFullYear()}`);
    });

    it('should support disabling all dates and navigation via the disabled attribute', async(() => {
         const fixture = createTestComponent(
             `<ngbx-datepicker [(ngModel)]="model" [startDate]="date" [disabled]="true"></ngbx-datepicker>`);
         fixture.detectChanges();
         fixture.whenStable()
             .then(() => {
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               for (let index = 0; index < 31; index++) {
                 expect(getDay(fixture.nativeElement, index)).toHaveCssClass('text-muted');
               }

               const links = getNavigationLinks(fixture.nativeElement);
               expect(links[0].hasAttribute('disabled')).toBeTruthy();
               expect(links[1].hasAttribute('disabled')).toBeTruthy();
               expect(getYearSelect(fixture.nativeElement).disabled).toBeTruthy();
               expect(getMonthSelect(fixture.nativeElement).disabled).toBeTruthy();
             });
       }));
  });

  describe('aria attributes', () => {
    const template = `<ngbx-datepicker #dp
        [startDate]="date"></ngbx-datepicker>
        `;

    it('should contains aria-label on the days', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));
      const dates = getDates(fixture.nativeElement);

      dates.forEach(function(date) {
        expect(date.getAttribute('aria-label')).toBeDefined('Missing aria-label attribute on a day');
      });
    });
  });

  describe('keyboard navigation', () => {

    const template = `<ngbx-datepicker #dp
        [startDate]="date" [minDate]="minDate"
        [maxDate]="maxDate" [displayMonths]="2"
        [markDisabled]="markDisabled"></ngbx-datepicker>
        <input id="focusout">
        `;

    it('should move focus with arrow keys', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));

      // focus in
      focusDay();

      triggerKeyDown(getMonthContainer(datepicker), 40 /* down arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 8));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 39 /* right arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 9));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 38 /* up arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 2));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 37 /* left arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 1));
      expectSelectedDate(datepicker, null);
    });

    it('should select focused date with enter or space', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));

      focusDay();

      triggerKeyDown(getMonthContainer(datepicker), 32 /* space */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 1));
      expectSelectedDate(datepicker, new NgbxDate(2016, 8, 1));

      triggerKeyDown(getMonthContainer(datepicker), 40 /* down arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 8));
      expectSelectedDate(datepicker, new NgbxDate(2016, 8, 1));

      triggerKeyDown(getMonthContainer(datepicker), 13 /* enter */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 8));
      expectSelectedDate(datepicker, new NgbxDate(2016, 8, 8));
    });

    it('should select first and last dates of the view with home/end', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));

      focusDay();

      triggerKeyDown(getMonthContainer(datepicker), 35 /* end */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 9, 30));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 36 /* home */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 1));
      expectSelectedDate(datepicker, null);
    });

    it('should select min and max dates with shift+home/end', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));

      focusDay();

      triggerKeyDown(getMonthContainer(datepicker), 35 /* end */, true /* shift */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2020, 12, 31));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 40 /* down arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2020, 12, 31));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 36 /* home */, true /* shift */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2010, 1, 1));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 38 /* up arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2010, 1, 1));
      expectSelectedDate(datepicker, null);
    });

    it('should navigate between months with pageUp/Down', () => {
      const fixture = createTestComponent(template);

      let datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));

      focusDay();

      triggerKeyDown(getMonthContainer(datepicker), 39 /* right arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 2));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 33 /* page up */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 7, 1));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 34 /* page down */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 1));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 34 /* page down */);
      fixture.detectChanges();

      expectFocusedDate(datepicker, new NgbxDate(2016, 9, 1));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 34 /* page down */);
      fixture.detectChanges();
      datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));
      expectFocusedDate(datepicker, new NgbxDate(2016, 10, 1));
      expectSelectedDate(datepicker, null);
    });

    it('should navigate between years with shift+pageUp/Down', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));
      focusDay();

      getMonthContainer(datepicker).triggerEventHandler('focus', {});
      fixture.detectChanges();

      expectFocusedDate(datepicker, new NgbxDate(2016, 8, 1));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 33 /* page up */, true /* shift */);
      fixture.detectChanges();

      expectFocusedDate(datepicker, new NgbxDate(2015, 1, 1), true);
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 34 /* page down */, true /* shift */);
      fixture.detectChanges();

      expectFocusedDate(datepicker, new NgbxDate(2016, 1, 1));
      expectSelectedDate(datepicker, null);
    });

    it(`shouldn't be focusable when disabled`, fakeAsync(() => {
         const fixture =
             createTestComponent(`<ngbx-datepicker #dp [(ngModel)]="model" [disabled]="true"></ngbx-datepicker>`);
         tick();
         fixture.detectChanges();

         const datepicker = fixture.debugElement.query(By.directive(NgbxDatepicker));

         const days = getFocusableDays(datepicker);

         expect(days.length).toEqual(0, 'A focusable day has been found');

       }));

  });

  describe('forms', () => {

    it('should work with template-driven form validation', async(() => {
         const fixture = createTestComponent(`
        <form>
          <ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model" name="date" required>
          </ngbx-datepicker>
        </form>
      `);

         const compiled = fixture.nativeElement;
         fixture.detectChanges();
         fixture.whenStable()
             .then(() => {
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               expect(getDatepicker(compiled)).toHaveCssClass('ng-invalid');
               expect(getDatepicker(compiled)).not.toHaveCssClass('ng-valid');

               fixture.componentInstance.model = {year: 2016, month: 8, day: 1};
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               expect(getDatepicker(compiled)).toHaveCssClass('ng-valid');
               expect(getDatepicker(compiled)).not.toHaveCssClass('ng-invalid');
             });
       }));

    it('should work with model-driven form validation', async(() => {
         const html = `
          <form [formGroup]="form">
            <ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" formControlName="control" required></ngbx-datepicker>
          </form>`;

         const fixture = createTestComponent(html);
         const compiled = fixture.nativeElement;
         fixture.detectChanges();
         fixture.whenStable()
             .then(() => {
               const dates = getDates(fixture.nativeElement);

               expect(getDatepicker(compiled)).toHaveCssClass('ng-invalid');
               expect(getDatepicker(compiled)).not.toHaveCssClass('ng-valid');

               dates[0].click();
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               expect(getDatepicker(compiled)).toHaveCssClass('ng-valid');
               expect(getDatepicker(compiled)).not.toHaveCssClass('ng-invalid');
             });
       }));

    it('should be disabled with reactive forms', async(() => {
         const html = `<form [formGroup]="disabledForm">
            <ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" formControlName="control">
            </ngbx-datepicker>
        </form>`;

         const fixture = createTestComponent(html);
         fixture.detectChanges();
         const dates = getDates(fixture.nativeElement);
         dates[0].click();  // 1 AUG 2016
         expect(fixture.componentInstance.disabledForm.controls['control'].value).toBeFalsy();
         for (let index = 0; index < 31; index++) {
           expect(getDay(fixture.nativeElement, index)).toHaveCssClass('text-muted');
         }
         expect(fixture.nativeElement.querySelector('ngbx-datepicker').getAttribute('tabindex')).toBeFalsy();
       }));

    it('should not change again the value in the model on a change coming from the model (template-driven form)',
       async(() => {
         const html = `<form>
             <ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model" name="date">
             </ngbx-datepicker>
           </form>`;

         const fixture = createTestComponent(html);
         fixture.detectChanges();

         const value = new NgbxDate(2018, 7, 28);
         fixture.componentInstance.model = value;

         fixture.detectChanges();
         fixture.whenStable().then(() => { expect(fixture.componentInstance.model).toBe(value); });
       }));

    it('should not change again the value in the model on a change coming from the model (reactive form)', async(() => {
         const html = `<form [formGroup]="form">
             <ngbx-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" formControlName="control">
             </ngbx-datepicker>
           </form>`;

         const fixture = createTestComponent(html);
         fixture.detectChanges();

         const formChangeSpy = jasmine.createSpy('form change');
         const form = fixture.componentInstance.form;
         form.valueChanges.subscribe(formChangeSpy);
         const controlValue = new NgbxDate(2018, 7, 28);
         form.setValue({control: controlValue});

         fixture.detectChanges();
         fixture.whenStable().then(() => {
           expect(formChangeSpy).toHaveBeenCalledTimes(1);
           expect(form.value.control).toBe(controlValue);
         });
       }));

  });

  describe('Custom config', () => {
    let config: NgbxDatepickerConfig;

    beforeEach(() => { TestBed.configureTestingModule({imports: [NgbxDatepickerModule]}); });

    beforeEach(inject([NgbxDatepickerConfig], (c: NgbxDatepickerConfig) => {
      config = c;
      customizeConfig(config);
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(NgbxDatepicker);

      const datepicker = fixture.componentInstance;
      expectSameValues(datepicker, config);
    });
  });

  describe('Custom config as provider', () => {
    const config = new NgbxDatepickerConfig();
    customizeConfig(config);

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbxDatepickerModule], providers: [{provide: NgbxDatepickerConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(NgbxDatepicker);

      const datepicker = fixture.componentInstance;
      expectSameValues(datepicker, config);
    });
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  date = {year: 2016, month: 8};
  displayMonths = 1;
  navigation = 'select';
  minDate: NgbxDateStruct = {year: 2010, month: 1, day: 1};
  maxDate: NgbxDateStruct = {year: 2020, month: 12, day: 31};
  form = new FormGroup({control: new FormControl('', Validators.required)});
  disabledForm = new FormGroup({control: new FormControl({value: null, disabled: true})});
  model;
  showWeekdays = true;
  dayTemplateData = () => '!';
  markDisabled = (date: NgbxDateStruct) => { return NgbxDate.from(date).equals(new NgbxDate(2016, 8, 22)); };
  onNavigate = () => {};
  onSelect = () => {};
  onPreventableNavigate = (event: NgbxDatepickerNavigateEvent) => event.preventDefault();
}
