import {TestBed, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {createGenericTestComponent} from '../test/common';

import {Component, Injectable} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';

import {NgbxDateAdapter, NgbxDatepickerModule} from './datepicker.module';
import {NgbxInputDatepicker} from './datepicker-input';
import {NgbxDatepicker} from './datepicker';
import {NgbxDateStruct} from './ngbx-date-struct';
import {NgbxDate} from './ngbx-date';

const createTestCmpt = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const createTestNativeCmpt = (html: string) =>
    createGenericTestComponent(html, TestNativeComponent) as ComponentFixture<TestNativeComponent>;

describe('NgbxInputDatepicker', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbxDatepickerModule, FormsModule]});
  });

  describe('open, close and toggle', () => {

    it('should allow controlling datepicker popup from outside', () => {
      const fixture = createTestCmpt(`
          <input ngbxDatepicker #d="ngbxDatepicker">
          <button (click)="open(d)">Open</button>
          <button (click)="close(d)">Close</button>
          <button (click)="toggle(d)">Toggle</button>`);

      const buttons = fixture.nativeElement.querySelectorAll('button');

      buttons[0].click();  // open
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngbx-datepicker')).not.toBeNull();

      buttons[1].click();  // close
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngbx-datepicker')).toBeNull();

      buttons[2].click();  // toggle
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngbx-datepicker')).not.toBeNull();

      buttons[2].click();  // toggle
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngbx-datepicker')).toBeNull();
    });

    it('should support the "position" option',
       () => { createTestCmpt(`<input ngbxDatepicker #d="ngbxDatepicker" [placement]="'bottom-right'">`); });
  });

  describe('ngModel interactions', () => {
    it('should not change again the value in the model on a change coming from the model (popup closed)',
       fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbxDatepicker [(ngModel)]="date">`);
         fixture.detectChanges();

         const input = fixture.nativeElement.querySelector('input');

         const value = new NgbxDate(2018, 8, 29);
         fixture.componentInstance.date = value;

         fixture.detectChanges();
         tick();
         expect(fixture.componentInstance.date).toBe(value);
         expect(input.value).toBe('2018-08-29');
       }));

    it('should not change again the value in the model on a change coming from the model (popup opened)',
       fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbxDatepicker [(ngModel)]="date" #d="ngbxDatepicker">
      <button (click)="open(d)">Open</button>`);
         fixture.detectChanges();

         const button = fixture.nativeElement.querySelector('button');
         const input = fixture.nativeElement.querySelector('input');

         button.click();  // open
         tick();
         fixture.detectChanges();

         const value = new NgbxDate(2018, 8, 29);
         fixture.componentInstance.date = value;
         fixture.detectChanges();
         tick();
         expect(fixture.componentInstance.date).toBe(value);
         expect(input.value).toBe('2018-08-29');
       }));


    it('should format bound date as ISO (by default) in the input field', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbxDatepicker [ngModel]="date">`);
         const input = fixture.nativeElement.querySelector('input');

         fixture.componentInstance.date = {year: 2016, month: 10, day: 10};
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('2016-10-10');

         fixture.componentInstance.date = {year: 2016, month: 10, day: 15};
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('2016-10-15');
       }));

    it('should parse user-entered date as ISO (by default)', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker [(ngModel)]="date">`);
      const inputDebugEl = fixture.debugElement.query(By.css('input'));

      inputDebugEl.triggerEventHandler('input', {target: {value: '2016-09-10'}});
      expect(fixture.componentInstance.date).toEqual({year: 2016, month: 9, day: 10});
    });

    it('should not update the model twice with the same value on input and on change', fakeAsync(() => {
         const fixture =
             createTestCmpt(`<input ngbxDatepicker [(ngModel)]="date" (ngModelChange)="onModelChange($event)">`);
         const componentInstance = fixture.componentInstance;
         const inputDebugEl = fixture.debugElement.query(By.css('input'));
         spyOn(componentInstance, 'onModelChange');

         tick();
         fixture.detectChanges();

         inputDebugEl.triggerEventHandler('input', {target: {value: '2018-08-29'}});
         tick();
         fixture.detectChanges();

         const value = componentInstance.date;
         expect(value).toEqual({year: 2018, month: 8, day: 29});
         expect(componentInstance.onModelChange).toHaveBeenCalledTimes(1);
         expect(componentInstance.onModelChange).toHaveBeenCalledWith(value);

         inputDebugEl.triggerEventHandler('change', {target: {value: '2018-08-29'}});

         tick();
         fixture.detectChanges();

         expect(fixture.componentInstance.date).toBe(value);

         // the value is still the same, there should not be new calls of onModelChange:
         expect(componentInstance.onModelChange).toHaveBeenCalledTimes(1);
       }));

    it('should set only valid dates', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbxDatepicker [ngModel]="date">`);
         const input = fixture.nativeElement.querySelector('input');

         fixture.componentInstance.date = <any>{};
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = null;
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = <any>new Date();
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = undefined;
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = new NgbxDate(300000, 1, 1);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = new NgbxDate(2017, 2, null);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = new NgbxDate(2017, null, 5);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = new NgbxDate(null, 2, 5);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = new NgbxDate(<any>'2017', <any>'03', <any>'10');
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');
       }));

    it('should propagate disabled state', fakeAsync(() => {
         const fixture = createTestCmpt(`
        <input ngbxDatepicker [(ngModel)]="date" #d="ngbxDatepicker" [disabled]="isDisabled">
        <button (click)="open(d)">Open</button>`);
         fixture.componentInstance.isDisabled = true;
         fixture.detectChanges();

         const button = fixture.nativeElement.querySelector('button');
         const input = fixture.nativeElement.querySelector('input');

         button.click();  // open
         tick();
         fixture.detectChanges();
         const buttonInDatePicker = fixture.nativeElement.querySelector('ngbx-datepicker button');

         expect(fixture.nativeElement.querySelector('ngbx-datepicker')).not.toBeNull();
         expect(input.disabled).toBeTruthy();
         expect(buttonInDatePicker.disabled).toBeTruthy();

         const dayElements = fixture.nativeElement.querySelectorAll('ngbx-datepicker-month-view .ngbx-dp-day');
         expect(dayElements[1]).toHaveCssClass('disabled');
         expect(dayElements[11]).toHaveCssClass('disabled');
         expect(dayElements[21]).toHaveCssClass('disabled');

         fixture.componentInstance.isDisabled = false;
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('ngbx-datepicker')).not.toBeNull();
         expect(input.disabled).toBeFalsy();
         expect(buttonInDatePicker.disabled).toBeFalsy();

         const dayElements2 = fixture.nativeElement.querySelectorAll('ngbx-datepicker-month-view .ngbx-dp-day');
         expect(dayElements2[1]).not.toHaveCssClass('disabled');
         expect(dayElements2[11]).not.toHaveCssClass('disabled');
         expect(dayElements2[21]).not.toHaveCssClass('disabled');
       }));

    it('should propagate disabled state without form control', () => {
      const fixture = createTestCmpt(`
        <input ngbxDatepicker #d="ngbxDatepicker" [disabled]="isDisabled">
        <button (click)="open(d)">Open</button>`);
      fixture.componentInstance.isDisabled = true;
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      const input = fixture.nativeElement.querySelector('input');

      expect(input.disabled).toBeTruthy();

      button.click();  // open
      fixture.detectChanges();
      const buttonInDatePicker = fixture.nativeElement.querySelector('ngbx-datepicker button');

      expect(fixture.nativeElement.querySelector('ngbx-datepicker')).not.toBeNull();
      expect(input.disabled).toBeTruthy();
      expect(buttonInDatePicker.disabled).toBeTruthy();

      const dayElements = fixture.nativeElement.querySelectorAll('ngbx-datepicker-month-view .ngbx-dp-day');
      expect(dayElements[1]).toHaveCssClass('disabled');
      expect(dayElements[11]).toHaveCssClass('disabled');
      expect(dayElements[21]).toHaveCssClass('disabled');

      fixture.componentInstance.isDisabled = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ngbx-datepicker')).not.toBeNull();
      expect(input.disabled).toBeFalsy();
      expect(buttonInDatePicker.disabled).toBeFalsy();

      const dayElements2 = fixture.nativeElement.querySelectorAll('ngbx-datepicker-month-view .ngbx-dp-day');
      expect(dayElements2[1]).not.toHaveCssClass('disabled');
      expect(dayElements2[11]).not.toHaveCssClass('disabled');
      expect(dayElements2[21]).not.toHaveCssClass('disabled');
    });

    it('should propagate touched state on (blur)', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbxDatepicker [(ngModel)]="date">`);
         const inputDebugEl = fixture.debugElement.query(By.css('input'));

         expect(inputDebugEl.classes['ng-touched']).toBeFalsy();

         inputDebugEl.triggerEventHandler('blur', {});
         tick();
         fixture.detectChanges();

         expect(inputDebugEl.classes['ng-touched']).toBeTruthy();
       }));

    it('should propagate touched state when setting a date', fakeAsync(() => {
         const fixture = createTestCmpt(`
      <input ngbxDatepicker [(ngModel)]="date" #d="ngbxDatepicker">
      <button (click)="open(d)">Open</button>`);

         const buttonDebugEl = fixture.debugElement.query(By.css('button'));
         const inputDebugEl = fixture.debugElement.query(By.css('input'));

         expect(inputDebugEl.classes['ng-touched']).toBeFalsy();

         buttonDebugEl.triggerEventHandler('click', {});  // open
         inputDebugEl.triggerEventHandler('change', {target: {value: '2016-09-10'}});
         tick();
         fixture.detectChanges();

         expect(inputDebugEl.classes['ng-touched']).toBeTruthy();
       }));

    it('should update model with updateOnBlur when selecting a date', fakeAsync(() => {
         const fixture = createTestCmpt(`
      <input ngbxDatepicker [startDate]="{year: 2018, month: 3}" [(ngModel)]="date" #d="ngbxDatepicker"
             [ngModelOptions]="{updateOn: 'blur'}">`);

         const inputDebugEl = fixture.debugElement.query(By.css('input'));
         const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

         // open
         dpInput.open();
         fixture.detectChanges();
         expect(inputDebugEl.classes['ng-touched']).toBeFalsy();
         expect(fixture.componentInstance.date).toBeUndefined();

         // select date
         fixture.nativeElement.querySelectorAll('.ngbx-dp-day')[3].click();  // 1 MAR 2018
         fixture.detectChanges();
         expect(fixture.componentInstance.date).toEqual({year: 2018, month: 3, day: 1});
         expect(inputDebugEl.nativeElement.value).toBe('2018-03-01');
         expect(inputDebugEl.classes['ng-touched']).toBeTruthy();
       }));
  });

  describe('manual data entry', () => {

    it('should reformat value entered by a user when it is valid', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbxDatepicker (ngModelChange)="date">`);
         const inputDebugEl = fixture.debugElement.query(By.css('input'));

         inputDebugEl.triggerEventHandler('change', {target: {value: '2016-9-1'}});
         tick();
         fixture.detectChanges();

         expect(inputDebugEl.nativeElement.value).toBe('2016-09-01');
       }));

    it('should retain value entered by a user if it is not valid', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbxDatepicker (ngModelChange)="date">`);
         const inputDebugEl = fixture.debugElement.query(By.css('input'));

         inputDebugEl.nativeElement.value = '2016-09-aa';
         inputDebugEl.triggerEventHandler('change', {target: {value: inputDebugEl.nativeElement.value}});
         tick();
         fixture.detectChanges();

         expect(inputDebugEl.nativeElement.value).toBe('2016-09-aa');
       }));

  });

  describe('validation', () => {

    describe('values set from model', () => {

      it('should not return errors for valid model', fakeAsync(() => {
           const fixture = createTestCmpt(
               `<form><input ngbxDatepicker [ngModel]="{year: 2017, month: 04, day: 04}" name="dp"></form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();
           expect(form.control.hasError('ngbxDate', ['dp'])).toBeFalsy();
         }));

      it('should not return errors for empty model', fakeAsync(() => {
           const fixture = createTestCmpt(`<form><input ngbxDatepicker [ngModel]="date" name="dp"></form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();
         }));

      it('should return "invalid" errors for invalid model', fakeAsync(() => {
           const fixture = createTestCmpt(`<form><input ngbxDatepicker [ngModel]="5" name="dp"></form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
           expect(form.control.getError('ngbxDate', ['dp']).invalid).toBe(5);
         }));

      it('should return "requiredBefore" errors for dates before minimal date', fakeAsync(() => {
           const fixture = createTestCmpt(`<form>
          <input ngbxDatepicker [ngModel]="{year: 2017, month: 04, day: 04}" [minDate]="{year: 2017, month: 6, day: 4}" name="dp">
        </form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
           expect(form.control.getError('ngbxDate', ['dp']).requiredBefore).toEqual({year: 2017, month: 6, day: 4});
         }));

      it('should return "requiredAfter" errors for dates after maximal date', fakeAsync(() => {
           const fixture = createTestCmpt(`<form>
          <input ngbxDatepicker [ngModel]="{year: 2017, month: 04, day: 04}" [maxDate]="{year: 2017, month: 2, day: 4}" name="dp">
        </form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
           expect(form.control.getError('ngbxDate', ['dp']).requiredAfter).toEqual({year: 2017, month: 2, day: 4});
         }));

      it('should update validity status when model changes', fakeAsync(() => {
           const fixture = createTestCmpt(`<form><input ngbxDatepicker [ngModel]="date" name="dp"></form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.componentRef.instance.date = <any>'invalid';
           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();

           fixture.componentRef.instance.date = {year: 2015, month: 7, day: 3};
           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();
         }));

      it('should update validity status when minDate changes', fakeAsync(() => {
           const fixture = createTestCmpt(`<form>
          <input ngbxDatepicker [ngModel]="{year: 2017, month: 2, day: 4}" [minDate]="date" name="dp">
        </form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();

           fixture.componentRef.instance.date = {year: 2018, month: 7, day: 3};
           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
         }));

      it('should update validity status when maxDate changes', fakeAsync(() => {
           const fixture = createTestCmpt(`<form>
          <input ngbxDatepicker [ngModel]="{year: 2017, month: 2, day: 4}" [maxDate]="date" name="dp">
        </form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();

           fixture.componentRef.instance.date = {year: 2015, month: 7, day: 3};
           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
         }));

      it('should update validity for manually entered dates', fakeAsync(() => {
           const fixture = createTestCmpt(`<form><input ngbxDatepicker [(ngModel)]="date" name="dp"></form>`);
           const inputDebugEl = fixture.debugElement.query(By.css('input'));
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           inputDebugEl.triggerEventHandler('input', {target: {value: '2016-09-10'}});
           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();

           inputDebugEl.triggerEventHandler('input', {target: {value: 'invalid'}});
           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
         }));

      it('should consider empty strings as valid', fakeAsync(() => {
           const fixture = createTestCmpt(`<form><input ngbxDatepicker [(ngModel)]="date" name="dp"></form>`);
           const inputDebugEl = fixture.debugElement.query(By.css('input'));
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           inputDebugEl.triggerEventHandler('change', {target: {value: '2016-09-10'}});
           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();

           inputDebugEl.triggerEventHandler('change', {target: {value: ''}});
           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();
         }));
    });

  });

  describe('options', () => {

    it('should propagate the "dayTemplate" option', () => {
      const fixture = createTestCmpt(`<ng-template #t></ng-template><input ngbxDatepicker [dayTemplate]="t">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.dayTemplate).toBeDefined();
    });

    it('should propagate the "dayTemplateData" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker [dayTemplateData]="noop">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.dayTemplateData).toBeDefined();
    });

    it('should propagate the "displayMonths" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker [displayMonths]="3">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.displayMonths).toBe(3);
    });

    it('should propagate the "firstDayOfWeek" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker [firstDayOfWeek]="5">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.firstDayOfWeek).toBe(5);
    });

    it('should propagate the "footerTemplate" option', () => {
      const fixture = createTestCmpt(`<ng-template #t></ng-template><input ngbxDatepicker [footerTemplate]="t">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.footerTemplate).toBeDefined();
    });

    it('should propagate the "markDisabled" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker [markDisabled]="noop">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.markDisabled).toBeDefined();
    });

    it('should propagate the "minDate" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker [minDate]="{year: 2016, month: 9, day: 13}">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.minDate).toEqual({year: 2016, month: 9, day: 13});
    });

    it('should propagate the "maxDate" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker [maxDate]="{year: 2016, month: 9, day: 13}">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.maxDate).toEqual({year: 2016, month: 9, day: 13});
    });

    it('should propagate the "outsideDays" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker outsideDays="collapsed">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.outsideDays).toEqual('collapsed');
    });

    it('should propagate the "navigation" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker navigation="none">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.navigation).toBe('none');
    });

    it('should propagate the "showWeekdays" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker [showWeekdays]="true">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.showWeekdays).toBeTruthy();
    });

    it('should propagate the "showWeekNumbers" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker [showWeekNumbers]="true">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.showWeekNumbers).toBeTruthy();
    });

    it('should propagate the "startDate" option', () => {
      const fixture = createTestCmpt(`<input ngbxDatepicker [startDate]="{year: 2016, month: 9}">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      expect(dp.startDate).toEqual({year: 2016, month: 9});
    });

    it('should propagate model as "startDate" option when "startDate" not provided', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbxDatepicker [ngModel]="{year: 2016, month: 9, day: 13}">`);
         const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

         tick();
         fixture.detectChanges();
         dpInput.open();
         fixture.detectChanges();

         const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
         expect(dp.startDate).toEqual(new NgbxDate(2016, 9, 13));
       }));

    it('should relay the "navigate" event', () => {
      const fixture =
          createTestCmpt(`<input ngbxDatepicker [startDate]="{year: 2016, month: 9}" (navigate)="onNavigate($event)">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);

      spyOn(fixture.componentInstance, 'onNavigate');

      dpInput.open();
      fixture.detectChanges();
      expect(fixture.componentInstance.onNavigate)
          .toHaveBeenCalledWith({current: null, next: {year: 2016, month: 9}, preventDefault: jasmine.any(Function)});

      const dp = fixture.debugElement.query(By.css('ngbx-datepicker')).injector.get(NgbxDatepicker);
      dp.navigateTo({year: 2018, month: 4});
      expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith({
        current: {year: 2016, month: 9},
        next: {year: 2018, month: 4},
        preventDefault: jasmine.any(Function)
      });
    });

    it('should emit both "dateSelect" and "onModelChange" events', () => {
      const fixture = createTestCmpt(`
          <input ngbxDatepicker ngModel [startDate]="{year: 2018, month: 3}"
          (ngModelChange)="onModelChange($event)" (dateSelect)="onDateSelect($event)">`);

      const dpInput = fixture.debugElement.query(By.directive(NgbxInputDatepicker)).injector.get(NgbxInputDatepicker);
      spyOn(fixture.componentInstance, 'onDateSelect');
      spyOn(fixture.componentInstance, 'onModelChange');

      // open
      dpInput.open();
      fixture.detectChanges();

      // click on a date
      fixture.nativeElement.querySelectorAll('.ngbx-dp-day')[3].click();  // 1 MAR 2018
      fixture.detectChanges();
      expect(fixture.componentInstance.onDateSelect).toHaveBeenCalledTimes(1);
      expect(fixture.componentInstance.onModelChange).toHaveBeenCalledTimes(1);

      // open again
      dpInput.open();
      fixture.detectChanges();

      // click the same date
      fixture.nativeElement.querySelectorAll('.ngbx-dp-day')[3].click();  // 1 MAR 2018
      fixture.detectChanges();
      expect(fixture.componentInstance.onDateSelect).toHaveBeenCalledTimes(2);
      expect(fixture.componentInstance.onModelChange).toHaveBeenCalledTimes(1);

      expect(fixture.componentInstance.onDateSelect).toHaveBeenCalledWith(new NgbxDate(2018, 3, 1));
      expect(fixture.componentInstance.onModelChange).toHaveBeenCalledWith({year: 2018, month: 3, day: 1});
    });
  });

  describe('container', () => {

    it('should be appended to the element matching the selector passed to "container"', () => {
      const selector = 'body';
      const fixture = createTestCmpt(`
          <input ngbxDatepicker #d="ngbxDatepicker" container="${selector}">
          <button (click)="open(d)">Open</button>
      `);

      // open date-picker
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ngbx-datepicker')).toBeNull();
      expect(document.querySelector(selector).querySelector('ngbx-datepicker')).not.toBeNull();
    });

    it('should properly destroy datepicker window when the "container" option is used', () => {
      const selector = 'body';
      const fixture = createTestCmpt(`
          <input ngbxDatepicker #d="ngbxDatepicker" container="${selector}">
          <button (click)="open(d)">Open</button>
          <button (click)="close(d)">Close</button>
      `);

      // open date-picker
      const buttons = fixture.nativeElement.querySelectorAll('button');
      buttons[0].click();  // open button
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ngbx-datepicker')).toBeNull();
      expect(document.querySelector(selector).querySelector('ngbx-datepicker')).not.toBeNull();

      // close date-picker
      buttons[1].click();  // close button
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ngbx-datepicker')).toBeNull();
      expect(document.querySelector(selector).querySelector('ngbx-datepicker')).toBeNull();
    });
  });

  describe('Native adapter', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestNativeComponent],
        imports: [NgbxDatepickerModule, FormsModule],
        providers: [{provide: NgbxDateAdapter, useClass: NgbxDateNativeAdapter}]
      });
    });

    it('should format bound date as ISO (by default) in the input field', fakeAsync(() => {
         const fixture = createTestNativeCmpt(`<input ngbxDatepicker [ngModel]="date">`);
         const input = fixture.nativeElement.querySelector('input');

         fixture.componentInstance.date = new Date(2018, 0, 3);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('2018-01-03');

         fixture.componentInstance.date = new Date(2018, 10, 13);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('2018-11-13');
       }));

    it('should parse user-entered date as ISO (by default)', () => {
      const fixture = createTestNativeCmpt(`<input ngbxDatepicker [(ngModel)]="date">`);
      const inputDebugEl = fixture.debugElement.query(By.css('input'));

      inputDebugEl.triggerEventHandler('input', {target: {value: '2018-01-03'}});
      expect(fixture.componentInstance.date).toEqual(new Date(2018, 0, 3));
    });
  });
});

@Injectable()
class NgbxDateNativeAdapter extends NgbxDateAdapter<Date> {
  fromModel(date: Date): NgbxDateStruct {
    return (date && date.getFullYear) ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} :
                                        null;
  }

  toModel(date: NgbxDateStruct): Date { return date ? new Date(date.year, date.month - 1, date.day) : null; }
}

@Component({selector: 'test-native-cmp', template: ''})
class TestNativeComponent {
  date: Date;
}

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  date: NgbxDateStruct;
  isDisabled;

  onNavigate() {}

  onDateSelect() {}

  onModelChange() {}

  open(d: NgbxInputDatepicker) { d.open(); }

  close(d: NgbxInputDatepicker) { d.close(); }

  toggle(d: NgbxInputDatepicker) { d.toggle(); }

  noop() {}
}
